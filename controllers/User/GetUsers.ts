import { Request, Response,  } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response) =>
    res.status(200).json(await User.find())
);
