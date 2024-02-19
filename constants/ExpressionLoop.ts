export default (model: any) => {
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

  let users = new Set();

  keys.forEach((key) => {
    for (let i = 0; i < model?.expressions[key]?.length; i++) {
      users.add(model.expressions[key][i]);
    }
  });

  return users;
};
