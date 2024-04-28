import express from "express";
import { Login, Logout, Register, bookmarks, follow, getOtherUsers, getProfile, unfollow } from "../controllers/userController.js";
import {isAuthenticated} from "../config/auth.js"

const router=express.Router();

router.post('/register',Register)

router.post('/login',Login)

router.get('/logout',Logout)

router.put('/bookmarks/:id',isAuthenticated,bookmarks)

router.get('/profile/:id',isAuthenticated,getProfile)

router.get('/getOtherUsers/:id',isAuthenticated,getOtherUsers)

router.post('/follow/:id',isAuthenticated,follow)

router.post('/unfollow/:id',isAuthenticated,unfollow)
export default router;
