// const express = require('express');
// const app = express();

// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });


import app from "./app";

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});