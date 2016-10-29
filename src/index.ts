import app from './app';

const port: number = process.env.PORT || 8101;

app.listen(port, (err) => {
  if (err) throw err;
  console.log('Server listening on port', port);
});