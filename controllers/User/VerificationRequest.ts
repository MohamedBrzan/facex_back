import { Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';

import { getUserId } from '../../constants/UserId';

export default AsyncHandler(async (req: Request, res: Response) => {
  const userId = (await getUserId(req)).toString();

  const {
    id: { number: idNumber, photo: idPhoto },
    passport: { number: passportNumber, photo: passportPhoto },
  } = req.body;

  let user = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        verified: {
          id: {
            number: idNumber,
            photo: idPhoto,
          },
          passport: {
            number: passportNumber,
            photo: passportPhoto,
          },
        },
      },
    },
    { runValidators: true, new: true, upsert: true }
  );

  const { verified } = user;

  return res.status(200).json({
    success: true,
    msg: 'verification request sent successfully',
    verified,
  });
});
