import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import SendToken from '../../middleware/SendToken';
import User from '../../Interfaces/User/User';

export default AsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: string, user: User) => {
      if (err)
        return res.status(401).json({
          message:
            'Access Denied. email or password is incorrect. please try again.',
        });
      if (!user)
        return res.status(401).json({ message: 'User Not Authorized' });
      return req.logIn(user, (err) =>
        err ? res.status(401).json({ error: err }) : SendToken(res, user)
      );
    })(req, res, next);
  }
);
