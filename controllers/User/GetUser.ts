import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const finder = await User.findById(id);
    if (!finder)
      return next(new ErrorHandler(404, `Cannot find User with id ${id}`));

    // const userId = (await getUserId(req)).toString();

    // let user = await User.findById(userId);

    // const findTheFinder = user.blocks.find(
    //   (blocks) => blocks.toString() === id
    // );

    // if (findTheFinder)
    //   return res.status(404).json({ msg: 'You blocked this user' });

    return res.status(200).json(finder);
  }
);
