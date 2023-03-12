import express from "express"
import MembersController from "./members.controller.js"
import { imageUpload } from "../storage.js"

const membersRouter = express.Router()

membersRouter
    .get('/', MembersController.GetMembers)
    .get('/unverified', MembersController.GetUnverifiedMembers)
    .post('/register', MembersController.Register)
    .post('/login', MembersController.Login)
    .post('/forgot-password', MembersController.ForgotPassword)
    .post('/reset-password', MembersController.ResetPassword)
    .delete('/delete', MembersController.Delete)
    .put('/verify', MembersController.Verify)
    .put('/edit', imageUpload("avatars").single("img"), MembersController.Edit)

export default membersRouter