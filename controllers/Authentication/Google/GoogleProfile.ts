import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../../middleware/AsyncHandler';
import debug from 'debug';
const debugProfile = debug('GoogleProfile');

export default AsyncHandler((req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.send(
      `<h1>You're logged in </h1><pre>${JSON.stringify(
        req.user,
        null,
        2
      )}</pre> `
    );
    debugProfile(req.user);
  } else {
    res.redirect('/');
  }
});
