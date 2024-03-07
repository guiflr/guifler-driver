import { app } from './shared/http/routes';

app.listen(80, () => {
  console.log('App Listen On Port: ', process.env.PORT);
});
