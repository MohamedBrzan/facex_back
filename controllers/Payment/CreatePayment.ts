import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Payment from '../../models/Payment/Payment';
import User from '../../models/User/User';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { card } = req.body;
    let payment = await Payment.create({ user: req['authorizedUser']._id, card });

    let user = await User.findById(req['authorizedUser']._id);

    if (!user) {
      await Payment.findByIdAndRemove(payment['_id']);
      return next(
        new ErrorHandler(404, `User With Id ${req['authorizedUser']._id} Not Exist`)
      );
    }

    await User.findByIdAndUpdate(req['authorizedUser']._id, {
      $push: {
        payments: payment['_id'],
      },
    });

    return res.status(200).json(payment);

    //**** */
  }
);
