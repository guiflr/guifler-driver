import express from 'express';
import cors from 'cors';
import { app } from './shared/http/routes';

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log('App on port', PORT);
});
