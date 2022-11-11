import mongoose from 'mongoose';

async function connectToDB() {
  if ([1, 2].includes(mongoose.connection.readyState)) {
    console.log('returning cached connection');
    return;
  }

  await mongoose.connect(
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
    }
  );
  return;
}

export default connectToDB;
