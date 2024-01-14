import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log('request arrived');

  return res.json({ ok: true });
});

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log('App on port', PORT);
});
