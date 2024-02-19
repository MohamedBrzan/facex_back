import { NextFunction, Request, Response } from 'express';
import AsyncHandler from '../../middleware/AsyncHandler';
import User from '../../models/User/User';
import Post from '../../models/Post/Post';
import Blog from '../../models/Blog/Blog';
import Reel from '../../models/Reel/Reel';
import Image from '../../models/Image/Image';
import Album from '../../models/Album/Album';
import Video from '../../models/Video/Video';
import Payment from '../../models/Payment/Payment';
import Comment from '../../models/Comment/Comment';
import Ad from '../../models/Ad/Ad';
import Notification from '../../models/Notification/Notification';
import Hashtag from '../../models/Hashtag/Hashtag';
import Reply from '../../models/Comment/Reply';
import { getUserId } from '../../constants/UserId';
import ExpressionLoop from '../../constants/ExpressionLoop';
import ErrorHandler from '../../middleware/ErrorHandler';
import DeleteCommentModel from '../../functions/DeleteCommentModel';
import ExpressionLoopToDelete from '../../constants/ExpressionLoopToDelete';
import FindInCommentModelAndDelete from '../../functions/FindInCommentModelAndDelete';
import DeletingModel from '../../functions/DeletingModel';
import Job from '../../models/Job/Job';
import DeletingUsersFromJobProperty from '../../functions/DeletingUsersFromJobProperty';

export default AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = (await getUserId(req)).toString();

    let user = await User.findById(userId);

    // if (user.deletion.isActive) {
    // const {
    //   date: { full, short },
    //   month,
    //   day,
    // } = user.deletion.executeIn;

    // const today = new Date().setDate(new Date().getDate() + 30);
    // const todayDate = new Date(today).toDateString();
    // const oneDay = 1000 * 60 * 60 * 24;

    // setInterval(async () => {
    //   if (todayDate == short) {
    const {
      posts,
      comments,
      replies,
      videos,
      shares,
      saves,
      blogs,
      reels,
      followers,
      followings,
      images,
      albums,
      payments,
      hashtags,
      ads,
      notifications,
    } = user;

    //********************************/
    //********* Deleting Post && Blogs && Reels && Videos ********
    //********************************/

    // //TODO: Posts && Blogs && Reels && Videos, comments and replies Part

    const modelsInfo = [
      {
        id: 1,
        modelName: Post,
        modelContainer: posts,
        sharesDir: 'posts',
        savesDir: 'posts',
      },
      {
        id: 2,
        modelName: Blog,
        modelContainer: blogs,
        sharesDir: 'blogs',
        savesDir: 'blogs',
      },
      {
        id: 3,
        modelName: Reel,
        modelContainer: reels,
        sharesDir: 'reels',
        savesDir: 'reels',
      },
      {
        id: 4,
        modelName: Video,
        modelContainer: videos,
        sharesDir: 'videos',
        savesDir: 'videos',
      },
    ];

    modelsInfo.forEach(
      async ({ modelName, modelContainer, sharesDir, savesDir }) => {
        await DeletingModel(
          next,
          modelName,
          modelContainer,
          userId,
          shares[sharesDir],
          saves[savesDir]
        );
      }
    );

    //! Delete the ( comments.reacted )
    if (comments?.reacted?.length > 0) {
      for (const commentId of comments.reacted) {
        const comment = await Comment.findById(commentId);
        Object.keys(comment.expressions).forEach((key) => {
          comment.expressions[key].forEach(async (id: any, index) => {
            if (userId === id.toString()) {
              comment.expressions[key].splice(index, 1);
              await comment.save();
              return;
            }
          });
        });
      }
    }

    //! Delete the ( replies.reacted )
    if (replies?.reacted?.length > 0) {
      for (const replyId of replies.reacted) {
        const reply = await Reply.findById(replyId);
        Object.keys(reply.expressions).forEach((key) => {
          reply.expressions[key].forEach(async (id: any, index) => {
            if (userId === id.toString()) {
              reply.expressions[key].splice(index, 1);
              await reply.save();
              return;
            }
          });
        });
      }
    }

    //TODO: Job
    const jobsProperties = [
      'published',
      'applied',
      'reviewing',
      'interviewing',
      'rejected',
      'approved',
    ];
    jobsProperties.forEach(async (propertyName) => {
      if (user.jobs[propertyName].length > 0) {
        await DeletingUsersFromJobProperty(userId, user, propertyName);
      }
    });

    //TODO: Followers && Following
    //! Delete Followers
    if (followers.length > 0) {
      for (const followerId of followers) {
        await User.findByIdAndUpdate(followerId, {
          $pull: { followings: userId },
        });
      }
    }
    //! Delete Followings
    if (followings.length > 0) {
      for (const followingId of followings) {
        await User.findByIdAndUpdate(followingId, {
          $pull: { followers: userId },
        });
      }
    }

    //TODO: Album && Images
    //! Delete the Album and Images inside it
    if (albums.length > 0) {
      for (const albumId of albums) {
        const album = await Album.findById(albumId);
        for (let imageId of album.images) {
          await Image.findByIdAndDelete(imageId);
          album.images.splice(album.images.indexOf(imageId), 1);
          await album.save();
        }
      }
    }
    //! Delete the image and Delete it from the Album if there's album
    if (images.length > 0) {
      for (const imageId of images) {
        const image = await Image.findById(imageId);
        for (let imageId of images) {
          await Album.findByIdAndUpdate(image.ref.toString(), {
            $pull: { images: imageId },
          });
          await Image.findByIdAndDelete(imageId);
        }
      }
    }

    //TODO: Payment
    if (payments.length > 0) {
      for (const paymentId of payments) {
        await Payment.findByIdAndDelete(paymentId);
      }
    }

    //TODO: Hashtags
    //! Delete Published Hashtags
    if (hashtags.published.length > 0) {
      for (const hashtagId of hashtags.published) {
        const hashtag = await Hashtag.findById(hashtagId);
        if (hashtag.followers.length > 0) {
          for (const followerId of hashtag.followers) {
            await User.findByIdAndUpdate(followerId, {
              $pull: { 'hashtags.reacted': hashtagId },
            });
          }
        }
        await Hashtag.findByIdAndDelete(hashtagId);
      }
    }

    //! Delete Reacted Hashtags
    if (hashtags.reacted.length > 0) {
      for (const hashtagId of hashtags.reacted) {
        await Hashtag.findByIdAndUpdate(hashtagId, {
          $pull: { followers: userId },
        });
      }
    }

    //TODO: Ad
    if (ads.length > 0) {
      for (const adId of ads) {
        await Ad.findOneAndRemove(adId);
      }
    }

    //TODO: Notifications

    return res
      .status(200)
      .json({ success: true, msg: 'User Deleted Successfully' });
  }
);
