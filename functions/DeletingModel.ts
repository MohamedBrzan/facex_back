import { NextFunction } from 'express';
import ExpressionLoop from '../constants/ExpressionLoop';
import User from '../models/User/User';
import ErrorHandler from '../middleware/ErrorHandler';
import FindInCommentModelAndDelete from './FindInCommentModelAndDelete';
import ExpressionLoopToDelete from '../constants/ExpressionLoopToDelete';
import Comment from '../models/Comment/Comment';
import Reply from '../models/Comment/Reply';
import CommentInterface from '../Interfaces/Comment/Comment';
import ReplyInterface from '../Interfaces/Comment/Reply';
import UserInterface from '../Interfaces/User/User';

export default async (
  next: NextFunction,
  modelName: any,
  modelContainer:
    | UserInterface['posts']
    | UserInterface['blogs']
    | UserInterface['reels']
    | UserInterface['videos'],
  userId: string,
  shares,
  saves
) => {
  //TODO: Posts, comments and replies Part
  //! Delete All User Posts
  if (modelContainer?.published?.length > 0) {
    for (const postId of modelContainer.published) {
      const post = await modelName.findById(postId.toString());

      //! Delete every user do expression
      const userWhoDoExpression = ExpressionLoop(post);
      if (userWhoDoExpression?.size > 0) {
        for (const userId of userWhoDoExpression) {
          const user = await User.findById(userId.toString());
          if (!user)
            return next(
              new ErrorHandler(404, `user with id ${userId} not found in DB`)
            );
          user.posts.reacted.splice(user.posts.reacted.indexOf(post), 1);
          await user.save();
        }
      }
      //! Delete every user do comment and reply to the post
      if (post?.comments?.length > 0) {
        await FindInCommentModelAndDelete(post, userId);
      }

      //! Delete all users who saves the post
      if (post?.saves?.length > 0) {
        for (const saveId of post.saves) {
          const saver = await User.findById(saveId);
          if (!saver)
            return next(
              new ErrorHandler(404, `user with id ${saveId} not found in DB`)
            );
          saver.saves.posts.splice(saver.saves.posts.indexOf(post), 1);
          await saver.save();
        }
      }

      //! Delete all users who shares the post
      if (post?.shares?.length > 0) {
        for (const saveId of post.shares) {
          const republishUser = await User.findById(saveId);
          if (!republishUser)
            return next(
              new ErrorHandler(404, `user with id ${saveId} not found in DB`)
            );
          republishUser.shares.posts.splice(
            republishUser.shares.posts.indexOf(post),
            1
          );
          await republishUser.save();
        }
      }

      await modelName.findByIdAndRemove(postId);
    }
  }
  if (modelContainer?.reacted?.length > 0) {
    for (const postId of modelContainer.reacted) {
      const post = await modelName.findById(postId.toString());
      //* find the user in post.expressions and deleted and return true, or false if not exist
      await ExpressionLoopToDelete(post, userId);
      if (post?.comments?.length > 0) {
        await FindInCommentModelAndDelete(post, userId);
      }
    }
  }

  //! Delete all user's shares
  if (shares.length > 0) {
    for (const sharedId of shares) {
      const post = await modelName.findById(sharedId);
      if (!post)
        return next(
          new ErrorHandler(
            404,
            `post with id ${sharedId} not found in DB shares`
          )
        );
      post.shares.splice(post.shares.indexOf(userId), 1);
      await post.save();
    }
  }

  //! Delete all user's saves
  if (saves.length > 0) {
    for (const sharedId of saves) {
      const post = await modelName.findById(sharedId);
      if (!post)
        return next(
          new ErrorHandler(
            404,
            `user with id ${sharedId} not found in DB saves`
          )
        );
      post.saves.splice(post.saves.indexOf(userId), 1);
      await post.save();
    }
  }
};
