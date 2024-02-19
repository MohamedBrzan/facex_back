import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Image from '../../models/Image/Image';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    let image = await Image.findById(id);
    if (!image)
      return next(new ErrorHandler(404, `Image With Id ${id} Not Exist`));

    let user = await User.findById(req['authorizedUser']._id);

    const imageIndex = user.images.findIndex(
      (image) => image['_id'].toString() === id
    );

    if (imageIndex >= 0) {
      user.images.splice(imageIndex, 1);
      await user.save();
      await Image.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Image Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Image",
    });
  }
);
