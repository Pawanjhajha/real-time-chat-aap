import express from "express";
import { singUp } from "../../controllers/authController/authController.js";

const authRouter=express.Router();

authRouter.post('/sing-up',singUp);

export default authRouter;