import { Response } from 'express';
import FindModelInUser from './FindModelInUser';

export default async (
  res: Response,
  userId: string,
  user: any,
  model: any,
  modelId: string,
  property: string,
  expressionKey?: string
) => {
  let keys = [
    'like',
    'love',
    'support',
    'sad',
    'happy',
    'angry',
    'disgust',
    'surprise',
    'fear',
  ];

  let foundedExpressionKey: string;
  let index: number;

  keys.forEach((key) => {
    for (let i = 0; i < model?.expressions[key]?.length; i++) {
      if (model.expressions[key][i].toString() === userId) {
        foundedExpressionKey = key;
        index = i;
        break;
      }
    }
  });

  if (index >= 0) {
    if (expressionKey === foundedExpressionKey) {
      model.expressions[expressionKey].splice(index, 1);
      await model.save();
      await FindModelInUser(
        user[property].published,
        user[property].reacted,
        user,
        userId,
        model,
        modelId,
        false
      );
      return res.status(200).json(model.expressions);
    } else {
      model.expressions[foundedExpressionKey].splice(index, 1);
      model.expressions[expressionKey].push(userId);
      await model.save();
      await FindModelInUser(
        user[property].published,
        user[property].reacted,
        user,
        userId,
        model,
        modelId,
        true
      );
    }
    return res.status(200).json(model.expressions);
  } else {
    model.expressions[expressionKey].push(userId);
    await model.save();
    await FindModelInUser(
      user[property].published,
      user[property].reacted,
      user,
      userId,
      model,
      modelId,
      true
    );
    return res.status(200).json(model.expressions);
  }
};
