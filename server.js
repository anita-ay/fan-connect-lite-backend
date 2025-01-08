// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const dotenv = require('dotenv');

console.log('Server is starting...');


process.on('uncaughtException', (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log('Uncaught Exception! Shutting down...');

  process.exit(1);
});

dotenv.config({
  path: './config.env',
});
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );


mongoose
  .connect(`mongodb+srv://adedayoayoola5683:8WDm31dfcH72gnFQ@cluster0.yhfrl.mongodb.net/fanconnect`, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedTopology: true,
    

  })
  .then(() => {
    console.log('DB connection successful!');
  });

//? SERVER STARTS
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(process.env.NODE_ENV);
  console.log(`Listening at Port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name);
  console.log(err.message);
  console.log('Unhandle Rejection! Shutting down...');

  server.close(() => {
    process.exit(1);
  });
});