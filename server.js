const mongoose = require("mongoose");
const DB_HOST =
  "mongodb+srv://Tetiana:masCgNwX7rkTyP5f@cluster0.1w2wtnl.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(3000))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

const app = require("./app");
