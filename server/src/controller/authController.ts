import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

// import { users } from '../db';
import UserCredentials from '../database/Credentials';

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) throw new Error("Missing SECRET_KEY");

interface RequestBodyType {
  email: string,
  password: string
}

export const signup = async (req: Request<{}, {}, RequestBodyType>, res: Response) => {
  try {
    const { email, password } = req.body;

    // const exists =  users.find(user => user.email === email);
    const alreadyRegisteredUsers = await UserCredentials.find({ email });
    console.log(alreadyRegisteredUsers)
    if (alreadyRegisteredUsers.length > 0) {
      return res.status(409).json({ message: "The email you entered is already in use*" });
    }

    // users.push({ email, password });
    const newUserCredentials = new UserCredentials({ email, password })
    await newUserCredentials.save()
    return res.status(201).json({ message: "User has been successfully registered." });
  } catch {
    return res.status(400).json({ message: "Bad request" });
  }
};

export const login = async (req: Request<{}, {}, RequestBodyType>, res: Response) => {
  try {
    const { email, password } = req.body;

    // const user = User.find(user => user.email === email && user.password === password);
    const users = await UserCredentials.find({ email, password });
    console.log(users)
    if (users.length === 0) {
      return res.status(401).json({ message: "Incorrect email or password*" });
    }
    const token = jwt.sign({ email }, SECRET_KEY);
    res.json({ token, email });
  } catch (error) {
    return res.status(400).json({ message: "Bad request" });
  }
};

export const getDashboard = (req: Request, res: Response) => {
  const user = (req as any).user; // you can make this strongly typed later
  res.json({ email: user.email });
};

export const deleteUser = async (req: Request<{}, {}, RequestBodyType>, res: Response) => {
  try {
    const { email, password } = req.body;
    const users = await UserCredentials.find({ email, password })
    if (users.length === 0) {
      return res.status(401).json({ message: "Incorrect email or password*" });
    }
    await UserCredentials.deleteOne({ email, password });
    return res.status(201).json({message: "Your account has been deleted."});
  }catch(error){
    return res.status(400).json({message: "Bad request"});
  }
}

export const searchUser = async (req: Request<{}, {}, RequestBodyType>, res: Response) => {
  try {
    const { email } = req.body;
    const users = await UserCredentials.find({ email })
    if (users.length === 0) {
      return res.status(401).json({ message: "This email doesn't match any user profile" });
    }
    return res.status(201).json({email})
  }catch(error){
    return res.status(400).json({message: "Bad request"});
  }
}

export const changePassword = async(req: Request<{}, {}, RequestBodyType>, res: Response) => {
  try{
    const {email, password} = req.body;
    await UserCredentials.updateOne({email}, {$set: {password}});
    return res.status(201).json({message: "Password successfully changed. You can now proceed to login."});
  }catch(error){
    return res.status(400).json({message: "Bad request"});
  }
}