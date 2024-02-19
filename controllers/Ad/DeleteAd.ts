import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Ad from '../../models/Ad/Ad';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let ad = await Ad.findById(id);
    if (!ad) return next(new ErrorHandler(404, `Ad With Id : ${id} Not Exist`));

    let user = await User.findById(req['authorizedUser']._id);

    const adIndex = user.ads.findIndex((ad) => ad['_id'].toString() === id);

    if (adIndex >= 0) {
      user.ads.splice(adIndex, 1);
      await user.save();
      await Ad.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Ad Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Ad",
    });
  }
);
