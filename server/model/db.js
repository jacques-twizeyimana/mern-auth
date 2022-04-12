const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://sandberg-g:jLx6i4RujUt84k4@cluster0.mjmat.mongodb.net/mern-auth?retryWrites=true&w=majority",
    // mongodb+srv://sandberg-g:<password>@cluster0.mjmat.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => console.log("CONNECTED TO DB"))
  .catch((err) => console.log("Failed to connect to the mongodb"));
