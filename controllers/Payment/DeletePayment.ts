import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Payment from '../../models/Payment/Payment';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let payment = await Payment.findById(id);
    if (!payment)
      return next(new ErrorHandler(404, `Payment With Id ${id} Not Exist`));

    let user = await User.findById(req['authorizedUser']._id);

    const paymentIndex = user.payments.findIndex(
      (payment) => payment['_id'].toString() === id
    );

    if (paymentIndex >= 0) {
      user.payments.splice(paymentIndex, 1);
      await user.save();
      await Payment.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Payment Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Payment",
    });
  }
);
