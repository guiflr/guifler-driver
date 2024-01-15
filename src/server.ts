import { app } from './shared/http/routes';

const PORT = process.env.PORT || 9090;
app.listen(PORT, () => {
  console.log('App on port', PORT);
});
