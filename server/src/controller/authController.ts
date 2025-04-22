import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'

import { users } from '../db';

dotenv.config()

const SECRET_KEY = process.env.SECRET_KEY;
if (!SECRET_KEY) throw new Error("Missing SECRET_KEY");

interface RequestBodyType {
  email: string,
  password: string
}

export const signup = (req: Request<{}, {}, RequestBodyType>, res: Response) => {
  try {
    const { email, password } = req.body;

    const exists = users.find(user => user.email === email);
    if (exists) {
      return res.status(409).json({ message: "User already exists" });
    }

    users.push({ email, password });
    return res.status(201).json({ message: "User registered successfully", email });
  } catch {
    return res.status(400).json({ message: "Bad request" });
  }
};

export const login = (req: Request<{}, {}, RequestBodyType>, res: Response) => {

  try {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
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