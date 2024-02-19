export default async (model: any) => {
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

  for (let key = 0; key < keys.length; key++) {
    for await (let exp of model.expressions[keys[key]]) {
      users.add(model.expressions[exp]);
    }
  }

  return users;
};
