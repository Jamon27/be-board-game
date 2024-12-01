import app from './app';

const PORT = process.env.BE_PORT || 3100;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
