import express, { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';
import GoogleCallBack from '../../controllers/Authentication/Google/GoogleCallBack';
import GoogleProfile from '../../controllers/Authentication/Google/GoogleProfile';
import debug from 'debug';
const debugLogout = debug('GoogleLogout');

const router = express();

router.get('/', (req: Request, res: Response) => {
  res.send('Welcome to facex server side!');
});

router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  GoogleCallBack
);

router.get('/profile', GoogleProfile);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  debugLogout('logout');
  if (req.user) {
    req.logout((err) => err && next(err));
  } else {
    debugLogout('redirected');
    res.redirect('/');
  }
});

export default router;
