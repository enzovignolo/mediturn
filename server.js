const dotenv = require("dotenv");
const app = require("./app.js");
const mongoose = require("mongoose");

dotenv.config();
port = process.env.PORT || 8000;
db = process.env.DB_LOCAL;

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const server = app.listen(port, (req, res) => {
  console.log(`Server has started on ${port}`);
});
