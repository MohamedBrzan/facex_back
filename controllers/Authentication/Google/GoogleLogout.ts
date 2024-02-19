import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import debug from 'debug';
const debugLogout = debug('GoogleLogout');

export default AsyncHandler(
  (req: Request, res: Response, next: NextFunction) => {
    debugLogout('logout');
    if (req.user) {
      req.logout((err) => err && next(err));
    } else {
      debugLogout('redirected');
      res.redirect('/');
    }
  }
);
