export default async (model: any, userId: string): Promise<void> => {
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

  keys.forEach(async (key): Promise<boolean> => {
    for (let i = 0; i < model.expressions[key].length; i++) {
      if (model.expressions[key][i].toString() === userId) {
        model.expressions[key].splice(i, 1);
        await model.save();
        return true;
      }
    }
    return false;
  });
};
