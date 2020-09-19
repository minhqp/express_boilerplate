const mongoose = require('mongoose');

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DATABASE,
  MONGO_USERNAME,
  MONGO_PASSWORD,
} = process.env;

// const mongoUri = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;
const mongoUri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}?authSource=admin`;

mongoose.connect(mongoUri, {
  autoIndex: false,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error.');
  console.error(err);
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log(`Connected to MongoDB: ${mongoUri}`);
});
