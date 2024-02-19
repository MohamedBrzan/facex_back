import User from '../models/User/User';

export default async (
  model: any,
  iterationDir: any,
  modelContainer: any,
  checkingDir: any,
  modelId: string,
  property: string
) => {
  let users = new Set();

  // TODO: models Loop
  for (let i = 0; i < iterationDir.length; i++) {
    const getModel = await model.findById(iterationDir[i].toString());
    modelContainer.add(getModel._id);
    users.add(getModel.user.toString());
  }

  //! Delete the models from users Who created or reacted about it
  for (let userId of users) {
    const user = await User.findById(userId).select(property);
    user[property].reacted?.forEach(async (m) => {
      if (checkingDir.toString() === modelId) {
        user[property].reacted.splice(
          user[property].reacted.indexOf(m),
          1
        );
        await user.save();
      }
    });
    user[property].published?.forEach(async (m) => {
      if (checkingDir.toString() === modelId) {
        user[property].published.splice(
          user[property].published.indexOf(m),
          1
        );
        await user.save();
      }
    });
  }

  return users;
};
