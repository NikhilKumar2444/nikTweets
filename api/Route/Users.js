import express from "express";
import { deleteUser, followUser, getUser,update, unfollowUser, getByUsername, fuzzySearch } from "../Controller/UserController.js";
import { verifyToken } from "../verifyToken.js";

const userRoutes=express.Router()

userRoutes.put("/:id",verifyToken,update);
userRoutes.get("/find/:id",getUser);
userRoutes.delete("/:id",verifyToken,deleteUser);
userRoutes.put("/follow/:id",verifyToken,followUser);
userRoutes.put("/unfollow/:id",verifyToken,unfollowUser);
userRoutes.get("/individual/:username",verifyToken,getByUsername);
userRoutes.get("/fuzzy/:str",verifyToken,fuzzySearch)
export default userRoutes;