import { Request, Response, NextFunction } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import Album from '../../models/Album/Album';
import ErrorHandler from '../../middleware/ErrorHandler';
import User from '../../models/User/User';
import Image from '../../models/Image/Image';
import { getUserId } from '../../constants/UserId';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const userId = (await getUserId(req)).toString();

    let album = await Album.findById(id);
    if (!album)
      return next(new ErrorHandler(404, `Album With Id ${id} Not Exist`));

    let user = await User.findById(userId);

    const albumIndex = user.albums.splice(user.albums.indexOf(album), 1);

    if (albumIndex.length > 0) {
      await user.save();

      //! Delete All Images that inside the Album
      for (let img of album.images) {
        //* Delete every single image from user
        user.images.splice(user.images.indexOf(img.toString()), 1);
        await user.save();

        //! Delete Images From DB
        await Image.findByIdAndRemove(img.toString());
      }
      //! Delete Album From DB
      await Album.findByIdAndRemove(id);

      return res
        .status(200)
        .json({ success: true, msg: 'Album Deleted Successfully' });
    }

    return res.status(404).json({
      success: false,
      message: "Sorry!!, You're Not The Owner Of This Album",
    });
  }
);
