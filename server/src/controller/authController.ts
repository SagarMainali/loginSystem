import { Request, Response } from 'express';
import { users } from '../db';

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

    return res.status(200).json({ message: "Login successful", email });
  } catch (error) {

    return res.status(400).json({ message: "Bad request" });
  }
};
