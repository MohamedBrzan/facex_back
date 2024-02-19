import { Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../Interfaces/User/User';

export default (res: Response, user: User) =>
  res
    .status(200)
    .cookie('token', jwt.sign(user, process.env.SESSION_SECRET), {
      maxAge: 1000 * 60 * 60 * 24 * 365.25,
      secure: false,
      httpOnly: true,
    })
    .json(user);
