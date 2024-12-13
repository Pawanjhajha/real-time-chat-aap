import { userModel } from "../../models/userModel.js"
import bcrypt from 'bcrypt';
import { CustomError } from "../../utils/customeError.js";
export const singUp = async (req, res, next) => {//use async becase all the function run asynchornully
    try {
        let err;
        console.log(req.body,"body")
        //1 check user is already exits
        const { email, password ,firstName,lastName} = req.body;
        console.log(email, "email")
        if (!email || !password || !firstName || !lastName) {
            err=new CustomError(422,'Please enter email & Password',{
                email:['Please provide email']
            })
            return next(err)
        }
        let user = await userModel.findOne({ email: email });
        if (user) {

            err=new CustomError(409,'The User already Exits.',{
                email:['User already Exits']
            })
            return next(err);
        }
        //2. if user not exits then encript the password
        const solt = await bcrypt.genSalt(10);//generate the solt
        const hashPassword = await bcrypt.hash(password, solt);
        //3.store the user in db
        user = await userModel.create({ email: email, password: hashPassword ,firstName:firstName,lastName:lastName});
        res.status(200).json({
            statusCode:200,
           data:null,
            message: "User created",
            errors: {}
          })

    } catch (error) {
        console.log(error,"error")
        return next(error)
    }
}