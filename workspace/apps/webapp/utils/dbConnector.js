import mongoose from 'mongoose';

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(
        'mongodb://' +
          process.env.COSMOSDB_HOST +
          ':' +
          process.env.COSMOSDB_PORT +
          '/' +
          process.env.COSMOSDB_DBNAME +
          '?ssl=true&replicaSet=globaldb',
        {
          auth: {
            username: process.env.COSMOSDB_USER,
            password: process.env.COSMOSDB_PASSWORD,
          },
          useNewUrlParser: true,
          useUnifiedTopology: true,
          retryWrites: false,
          retryReads: true,
          bufferCommands: false,
        }
      )
      .then((mongoose) => {
        return mongoose;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDB;
