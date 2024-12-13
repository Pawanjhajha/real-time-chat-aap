import { userModel } from "../../models/userModel.js"
import bcrypt from 'bcrypt';
import { CustomError } from "../../utils/customeError.js";
import jwt from 'jsonwebtoken';
export const singUp = async (req, res, next) => {//use async becase all the function run asynchornully
    try {
        let err;
        //1 check user is already exits
        const { email, password, firstName, lastName } = req.body;
        if (!email || !password || !firstName || !lastName) {
            err = new CustomError(422, 'Please enter email & Password', {
                email: ['Please provide email']
            })
            return next(err)
        }
        let user = await userModel.findOne({ email: email });
        if (user) {

            err = new CustomError(409, 'The User already Exits.', {
                email: ['User already Exits']
            })
            return next(err);
        }
        //2. if user not exits then encript the password
        const solt = await bcrypt.genSalt(10);//generate the solt
        const hashPassword = await bcrypt.hash(password, solt);
        //3.store the user in db
        user = await userModel.create({ email: email, password: hashPassword, firstName: firstName, lastName: lastName });
        res.status(200).json({
            statusCode: 200,
            data: null,
            message: "User created",
            errors: {}
        })

    } catch (error) {
        return next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        let err = null;
        const { email, password } = req.body;
        if (!email || !password) {
            err = new CustomError(422, 'Please Enter email & password', {
                email: ["Please provide email & password"]
            })
            return next(err);
        }
        //1.create the email exits
        const user = await userModel.findOne({ email: email });
        if (!user) {
            err = new CustomError(404, "User not found", {
                email: ['Email not exits']
            })
            return next(err);
        }
        //2. check the password is match
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            err = new CustomError(401, "Unauthorized", {
                email: ["Invalid Credentials"]
            })
            return next(err);
        }
        //3.create the jwt token 
        const payload = {
            sub: user._id,
            name: user.name,
            firstName: user.firstName,
            lastName: user.lastName,

        }
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY) });//by default it take expire time in second
        res.status(200).json({
            statusCode: 200,
            data: {
                token: token,
                expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRY),
                tokenType: 'bearer',
            },
            message: "LoggedIn",
            errors: {}
        })
    } catch (error) {
        return next(error)
    }
}