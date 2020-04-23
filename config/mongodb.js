const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((self) => {
    console.log(`Connected to ${self.connection.name}`);
  })
  .catch((err) => {
    console.log(`An error occured while connecting to the Database...`);
  });

// mongoose.connection.on("connected", () =>
//   console.log("Yay mongodb connected :)")
// );

// mongoose.connection.on("error", () => console.log("nay db error sorry :("));