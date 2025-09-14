import UserController from "../controller/user.Controller";
import express from "express";
import { validator } from "../middleware/validator";
import { createUserSchema, loginSchema, updateUserSchema } from "../schema/user.joi";
import { authenticateToken } from "../middleware/validatorToken";


const userRouter =  express.Router();

const userController = new UserController();

// Create User
userRouter.post('/', validator(createUserSchema) , userController.createUser.bind(userController));

userRouter.post('/login', [validator(loginSchema )] ,userController.login.bind(userController));

userRouter.get('/user', authenticateToken ,userController.getUser.bind(userController));

// Update User
userRouter.put('/user/:id', [validator( updateUserSchema) ],  userController.updateUser.bind(userController));

userRouter.put("/makeAdmin/:id" , authenticateToken ,userController.makeUserAdmin.bind(userController));

// Delete User
userRouter.delete('/user/:id', userController.deleteUser.bind(userController));

export default userRouter;