import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import passport from 'passport';

export default AsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', () => {
      req.session.regenerate(function (err) {
        if (err) return next(err);
      });
      req.logOut(function (err) {
        if (err) return next(err);
      });
      req.session.destroy(function (err) {
        if (err) return next(err);
      });
      req.user = null;
      return res
        .clearCookie('token', { path: '/' })
        .clearCookie('Session', { path: '/' })
        .status(200)
        .json({ msg: 'User logged out successfully' });
    })(req, res, next);
  }
);
