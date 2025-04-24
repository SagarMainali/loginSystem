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
    const alreadyRegisteredUser = await UserCredentials.find({ email });
    console.log(alreadyRegisteredUser)
    if (alreadyRegisteredUser.length > 0) {
      return res.status(409).json({ message: "The email you entered is already in use*" });
    }

    // users.push({ email, password });
    const newUserCredentials = new UserCredentials({ email, password })
    await newUserCredentials.save()
    return res.status(201).json({ message: "User registered successfully", email });
  } catch {
    return res.status(400).json({ message: "Bad request" });
  }
};

export const login = async (req: Request<{}, {}, RequestBodyType>, res: Response) => {

  try {
    const { email, password } = req.body;

    // const user = User.find(user => user.email === email && user.password === password);
    const user = await UserCredentials.find({ email, password });
    console.log(user)
    if (user.length === 0) {
      return res.status(401).json({ message: "Incorrect email or password*" });
    }
    const token = jwt.sign({ email }, SECRET_KEY);
    res.json({ token });
  } catch (error) {
    return res.status(400).json({ message: "Bad request" });
  }
};

export const getDashboard = (req: Request, res: Response) => {
  const user = (req as any).user; // you can make this strongly typed later
  res.json({ email: user.email });
};