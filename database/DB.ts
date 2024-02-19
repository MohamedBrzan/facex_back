import mongoose, { ConnectOptions } from 'mongoose';
import debug from 'debug';
const debugDB = debug('app:Database');

const DB = async () =>
  await mongoose
    .connect(`${process.env.DATABASE_URL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => debugDB(`DATABASE CONNECTED SUCCESSFULLY :)`))
    .catch((err) => debugDB(`DATABASE CONNECTION FAILED :( ${err.message}`));

export default DB;
