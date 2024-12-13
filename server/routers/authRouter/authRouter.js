import express from "express";
import { singUp } from "../../controllers/authController/authController.js";

const authRouter=express.Router();

authRouter.post('/singUp',singUp);

export default authRouter;