const app = require("../app");

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running. Use our API on port: ${PORT}`);
// });

const mongoose = require("mongoose");
const { DB_URL } = require("../config");

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
