import express from "express";
import { login, singUp } from "../../controllers/authController/authController.js";

const authRouter=express.Router();

authRouter.post('/singUp',singUp);
authRouter.post('/login',login);

export default authRouter;