import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Payment from '../../models/Payment/Payment';
import ErrorHandler from '../../middleware/ErrorHandler';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let payment = await Payment.findById(id);
    if (!payment)
      return next(new ErrorHandler(404, `Payment With Id ${id} Not Exist`));

    payment = await Payment.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    return res.status(200).json(payment);
  }
);
