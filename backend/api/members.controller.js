import membersDAO from "../dao/membersDAO.js"
import mongodb from "mongodb"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { toPng } from "jdenticon"
import { writeFileSync } from "fs"
import membersSchema from "../schema/members.validation.schema.js"
import membersUpdateSchema from "../schema/members.update.schema.js"

const ObjectId = mongodb.ObjectID

export default class MembersController {
    
    static async GetMembers(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: 'Access Denied' })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if(req.user.verified) {
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
        } catch(e) {
            res.json({ error: e })
        }
    }

    static async GetUnverifiedMembers(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: 'Access Denied' })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if(req.user.admin) {
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
        } catch(e) {
            res.json({ error: e })
        }
    }

    static async Register(req, res, next) {
        try {            
            // Validate registration information and return error if invalid
            const { error } = await membersSchema.validateAsync(req.body)
            if (error) return res.status(400).json({ error: error.details[0].message })

            // Check if email or username already exists
            if (await membersDAO.checkUserExistsByName(req.body.name)) {
                return res.status(400).json({ error: "User already exists with this name" })
            } else if (await membersDAO.checkUserExistsByEmail(req.body.email)) {
                return res.status(400).json({ error: "User already exists with this email" })
            }

            // Upload default avatar
            let png = toPng(req.body.name, 150)
            let url = `public/avatars/${req.body.name}`
            writeFileSync(url, png)

            // Insert into database
            const userInfo = {
                avatar: url,
                email: req.body.email,
                name: req.body.name,
                class: req.body.class,
                specialty: req.body.specialty,
                description: '',
                interests: req.body.interests,
                role: req.body.role,
                phone: req.body.phone,
                address: {
                    street: req.body.address.street,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    zipcode: req.body.address.zipcode
                },
                password: await bcrypt.hash(req.body.password, 10),
                date: Date.now(),
                permission_level: 0,
                verified: false,
                admin: false
            }
            await membersDAO.createUser(userInfo)
            res.json({ status: "Please wait until your account is verified." })
        } catch(err) {
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
                        admin: user.admin
                    }, process.env.TOKEN_SECRET)
                    res.json({ status: "Successfully Logged In", token: token }) 
                } else {
                    res.status(400).json({ error: "Email or password is incorrect" })
                }
            } else {
                res.status(400).json({ error: "Email or password is incorrect" })
            }
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }

    static async DeleteMember(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: 'Access Denied' })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (req.user.admin) {
                await membersDAO.deleteOne({ _id: ObjectId(req.body._id) })
                res.json({ status: "success" })
            } else {
                res.status(403).json({ error: "You do not have permission to do this action" })
            }
        } catch(err) {
            res.status(400).json({ error: "Invalid Token" })
        }
    }

    static async VerifyMember(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: "Access Denied" })
        try {
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (req.user.admin) {
                await membersDAO.verifyOne(req.body._id)
                res.json({ status: "success" })
            } else {
                res.status(403).json({ error: "You do not have permission to do this action" })
            }
        } catch(err) {
            res.status(400).json({ error: "Invalid Token" })
        }
    }

    static async updateProfile(req, res, next) {
        const token = req.header('auth-token')
        if (!token) return res.status(401).json({ error: "Access Denied" })
        try {
            // Validate registration information and return error if invalid
            const { error } = await membersUpdateSchema.validateAsync(req.body.update)
            if (error) return res.status(400).json({ error: error.details[0].message })

            // Verify user perms and update
            req.user = jwt.verify(token, process.env.TOKEN_SECRET)
            if (req.user.admin || req.user._id == ObjectId(req.body._id)) {
                await membersDAO.updateOne(req.body._id, req.body.update)
                res.json({ status: "Successfully Updated Profile" })
            } else {
                res.status(403).json({ error: "You do not have permission to do this action" })
            }
        } catch(err) {
            res.status(500).json({ error: err.message })
        }
    }
}

