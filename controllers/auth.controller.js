import { compare } from "bcrypt";
import { comparePassword, createUser, getUserByEmail, hashPassword } from "../services/auth.services.js";
// const bcrypt = require('bcrypt')



export const getRegisterPage = (req,res) =>{
    return res.render("../views/auth/register");
};

export const postRegister = async(req,res)=>{
    // console.log(req.body);

    const {name, email, password} = req.body;

    const userExists = await getUserByEmail(email);
    console.log(userExists);

    if(userExists) return res.redirect("/register");

    const hashedPassword = await hashPassword(password);

    const [user] = await createUser({name,email,password: hashedPassword});
    console.log(user);

    res.redirect("/login");
}

export const getLoginPage = (req,res) =>{
    return res.render("../views/auth/login");
};

export const postLogin =async (req,res) =>{
    const { email, password} = req.body;

    const user = await getUserByEmail(email);
    console.log(user);

    if(!user) return res.redirect("/login");

    const isPasswordvalid = await comparePassword
    (password,user.password);

    // if(user.password != password ) return res.redirect("/login");

    if(!isPasswordvalid ) return res.redirect("/login");


    res.cookie("isLoggedIn",true);
   res.redirect("/");
};

// Do you need to set Path=/ Manually?
//cookie-parser and express automatically set the path to / by default.