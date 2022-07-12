import express from "express"
import MembersController from "./members.controller.js"
import multer from "multer"

const membersRouter = express.Router()

// Handle uploading user avatars to disk storage
const storage = multer.diskStorage({
    destination: './public/avatars',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const maxSize = 1024*1024
const upload = multer({ storage: storage, limits: { fileSize: maxSize }})

// API endpoints
membersRouter
    .get('/', MembersController.GetMembers)
    .get('/unverified', MembersController.GetUnverifiedMembers)
    .post('/register', MembersController.Register)
    .post('/login', MembersController.Login)
    .delete('/delete', MembersController.Delete)
    .put('/verify', MembersController.Verify)
    .put('/edit', MembersController.Edit)

export default membersRouter

