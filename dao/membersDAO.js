import { unlinkSync } from "fs"

let members

export default class membersDAO {
    static async injectDB(conn) {
        if (members) return
        try {
            members = await conn.db(process.env.DB).collection("members")
        } catch (e) {
            console.error(`Unable to establish collection handles in membersDAO: ${e}`)
        }
    }

    static async findUsers({
        filters = null,
        membersPerPage = 20
    } = {}) {
        let query = {}
        if (filters) {
            if ("name" in filters) {
                query.name = { $eq: filters["name"] }
            }
            if ("verified" in filters) {
                query.verified = { $eq: filters["verified"] }
            }
        }
        let cursor
        try {
            cursor = await members.find(query)
                .project({ 
                    name: 1, class: 1, description: 1, role: 1, 
                    interests: 1, date: 1, phone: 1, address: 1, email: 1, 
                    specialty: 1, avatar: 1
                })
                .sort({ date: -1 })
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { membersList: [], totalNumMembers: 0 }
        }
        const displayCursor = cursor.limit(membersPerPage)
        try {
            const membersList = await displayCursor.toArray()
            const totalNumMembers = await members.countDocuments(query)
            return { membersList, totalNumMembers }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`,)
            return { membersList, totalNumMembers }
        }
    }

    static async numberOfUsers() {
        try {
            return await members.countDocuments()
        } catch (e) {
            console.error(`Unable to retrieve number of users: ${e}`)
        }
    }

    static async findUserByEmail(email) {
        try {
            return await members.findOne({ email: email })
        } catch (e) {
            console.error(`Unable to find user: ${e}`)
        }
    }

    static async findUserById(id) {
        try {
            return await members.findOne({ _id: id })
        } catch (e) {
            console.error(`Unable to find user: ${e}`)
        }
    }

    static async checkUserExistsByName(name) {
        const cursor = await members.findOne({ name: name })
        if (cursor != null) {
            return true
        } else {
            return false
        }
    }

    static async checkUserExistsByEmail(email) {
        const cursor = await members.findOne({ email: email })
        if (cursor != null) {
            return true
        } else {
            return false
        }
    }

    static async createUser(member) {
        try {
            return await members.insertOne(member)
        } catch (e) {
            console.error(`Unable to create user: ${e}`)
            return { error: e }
        }
    }

    static async updateOne(id, update) {
        try {
            return await members.updateOne({ _id: id }, {
                $set: {
                    ...(update.email && { email: update.email }),
                    ...(update.password && { password: await bcrypt.hash(update.password, 10) }),
                    ...(update.description && { description: update.description }),
                    ...(update.phone && { phone: update.phone }),
                    ...(update.address && { address: {
                            city: update.address.city,
                            state: update.address.state,
                            zipcode: update.address.zipcode,
                            ...(update.address.street && { street: update.address.street }),
                        }}
                        )
                }
            })
        } catch (e) {
            console.error(`Unable to update user: ${e}`)
            return { error: e }
        }
    }

    static async deleteOne(member) {
        try {
            // Remove member avatar from storage
            let member = await members.findOne(member)
            unlinkSync(member.avatar, (err) => console.error(err))

            // Delete member
            return await members.deleteOne(member)
        } catch (e) {
            console.error(`Unable to delete user: ${e}`)
            return { error: e }
        }
    }

    static async verifyOne(id) {
        try {
            return await members.updateOne({ _id: id }, {
                $set: { verified: true },
                $unset: { PhoneNumberVerificationCode: "" }
            })
        } catch(e) {
            console.error(`Unable to verify member: ${e}`)
            return { error: e }
        }
    }
}

