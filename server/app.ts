import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import { errorHandler, notFound } from './middleware/common/errorHandler';
import authRoute from './routers/auth';
import userRoute from './routers/user';

// dotenv configuration
dotenv.config();

const port = process.env.PORT || 5000;
const app: Express = express();

// database connection
mongoose.set('strictQuery', false);
mongoose
  .connect(`${process.env.DB_URL}`)
  .then(() => console.log('💡 [database]: Database connection successfully!'))
  .catch((err) =>
    console.log(`❌ Database connection fail for ${err.message}`)
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// application routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

// listen application
app.listen(port, () => {
  console.log(`⚡ [server]: Server is running at http://localhost:${port}`);
});
