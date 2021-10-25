import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import utilRoutes from './routes/utils.js';
import devRoutes from './routes/devRoutes.js';

const app = express();

dotenv.config();

//setting up bodyparser and cors
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.get('/', (req,res)=> {
  res.send('Welcome to UVCE Marvel REST API.')
});

//starting points for routes
app.use('', utilRoutes);
app.use('/dev', devRoutes);

//connecting to mongodb
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));