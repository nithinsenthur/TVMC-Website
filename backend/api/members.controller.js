import membersDAO from "../dao/membersDAO.js"
import mongodb from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import twilio from "twilio"
import transporter from "../mail.js"
import membersSchema from "../other/members.validation.schema.js"
import membersUpdateSchema from "../other/members.update.schema.js"

if (process.env.NODE_ENV !== 'production') dotenv.config()

const ObjectId = mongodb.ObjectID
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export default class MembersController {
    static async GetMembers(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: 'Access Denied' })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (req.user.verified) {
                // Add filters
                let filters = { verified: true }
                if (req.query.name) {
                    filters.name = req.query.name
                }

                // Retrieve users from database and send
                const { membersList, totalNumMembers } = await membersDAO.findUsers({ filters })
                let response = {
                    members: membersList,
                    filters: filters,
                    total_results: totalNumMembers,
                }
                res.json(response)
            } else {
                res.status(403).json({ error: "You do not have the permission to do this action" })
            }
        } catch (e) {
            res.json({ error: e })
        }
    }

    static async GetUnverifiedMembers(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: 'Access Denied' })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (req.user.permissions.admin) {
                // Filter only unverified users
                let filters = { verified: false }

                // Retrieve users from database and send
                const { membersList, totalNumMembers } = await membersDAO.findUsers({ filters })
                let response = {
                    members: membersList,
                    filters: filters,
                    total_results: totalNumMembers,
                }
                res.json(response)
            } else {
                res.status(403).json({ error: "You do not have the permission to do this action" })
            }
        } catch (e) {
            res.json({ error: e })
        }
    }

    static async Register(req, res, next) {
        try {
            const { error } = await membersSchema.validateAsync(req.body)
            if (error) return res.status(400).json({ error: error.details[0].message })

            // correct this
            if (await membersDAO.checkUserExistsByName(req.body.name)) {
                return res.status(400).json({ error: "User already exists with this name" })
            } else if (await membersDAO.checkUserExistsByEmail(req.body.email)) {
                return res.status(400).json({ error: "User already exists with this email" })
            }
            
            let PhoneNumberVerificationCode = Math.floor(1000 + Math.random() * 9000)
            client.messages.create({
                body: `The number to verify your TVMC account is ${PhoneNumberVerificationCode}`,
                from: `${process.env.TWILIO_PHONE_NUMBER}`,
                to: `+${req.body.phone}`,
            })

            const id = await membersDAO.numberOfUsers() + 1;

            await membersDAO.createUser({
                _id: id,
                avatar: "avatar/default.png",
                email: req.body.email,
                name: req.body.name,
                class: req.body.class,
                specialty: req.body.specialty,
                institution: req.body.institution,
                description: '',
                interests: req.body.interests,
                role: req.body.role,
                phone: req.body.phone,
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zipcode: req.body.address.zipcode,
                    country: req.body.country
                },
                password: await bcrypt.hash(req.body.password, 10),
                date: Date.now(),
                verified: false,
                PhoneNumberVerificationCode: PhoneNumberVerificationCode,
                permissions: {
                    admin: false
                }
            })

            const token = jwt.sign({
                _id: id,
                name: req.body.name,
                verified: false,
                permissions: { admin: false }
            }, process.env.TOKEN_SECRET)

            res.json({ status: "Please check your phone number for the verification code", token: token })
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async Login(req, res, next) {
        try {
            const user = await membersDAO.findUserByEmail(req.body.email)
            if (user) {
                if (await bcrypt.compare(req.body.password, user.password)) {
                    const token = jwt.sign({
                        _id: user._id,
                        name: user.name,
                        verified: user.verified,
                        permissions: user.permissions
                    }, process.env.TOKEN_SECRET)
                    res.json({ status: "Successfully logged in", token: token })
                } else {
                    res.status(400).json({ error: "Email or password is incorrect" })
                }
            } else {
                res.status(400).json({ error: "Email or password is incorrect" })
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async ForgotPassword(req, res, next) { 
        try {
            let user = await membersDAO.findUserByEmail(req.body.email)
            if(user) {
                const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 })
                let info = await transporter.sendMail({
                    to: req.body.email,
                    subject: "Link to reset the password of your TVMC account",
                    text: `Click the link below to reset the password of your TVMC account.\n${process.env.SITE_URL}/reset-password/${token}`
                })
            }
            res.json({ status: "If you registered an account with this email then a link which will expire in an hour should arrive in your inbox" })
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async ResetPassword(req, res, next) {
        const token = req.header('reset-token')
        if (!token) return res.status(401).json({ error: 'Access Denied' })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)

            // Validate new password and return error if invalid
            const { error } = await membersUpdateSchema.validateAsync(req.body)
            if (error) return res.status(400).json({ error: error.details[0].message })

            // update user password
            await membersDAO.updateOne(req.user._id , { password: req.body.password })
            res.json({ status: "You have successfully changed your password " })
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async Delete(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: 'Access Denied' })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (req.user.permissions.admin) {
                await membersDAO.deleteOne({ _id: ObjectId(req.body._id) })
                res.json({ status: "Success" })
            } else {
                res.status(403).json({ error: "You do not have permission to do this action" })
            }
        } catch (err) {
            res.status(400).json({ error: "Invalid Token" })
        }
    }

    static async Verify(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: "Access Denied" })
        try {
            // Verify the code is correct, update member to verified, and re-send token
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            const user = await membersDAO.findUserById(req.user._id)
            if(user.PhoneNumberVerificationCode == req.body.PhoneNumberVerificationCode) 
            {
                await membersDAO.verifyOne(req.user._id)
                const newToken = jwt.sign({
                    _id: user._id,
                    name: user.name,
                    verified: true,
                    permissions: user.permissions
                }, process.env.TOKEN_SECRET)
                res.json({ status: "You have successfully verified your account", token: newToken })
            } else {
                res.status(403).json({ error: "You have entered an incorrect code" })
            }
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
    }

    static async Edit(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: "Access Denied" })
        try {
            // Validate registration information and return error if invalid
            const { error } = await membersUpdateSchema.validateAsync(req.body.update)
            if (error) return res.status(400).json({ error: error.details[0].message })

            // Verify user perms and update
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (req.user.permissions.admin || req.user._id == req.body._id) {
                await membersDAO.updateOne(req.body._id, req.body.update)
                res.json({ status: "Successfully Updated Profile" })
            } else {
                res.status(403).json({ error: "You do not have permission to do this action" })
            }
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
}

