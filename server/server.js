const express = require("express");
const mongoose = require("mongoose");
const app = express();

const connectDb = async () => {
  const mongoURI =
    "mongodb+srv://siwyus:d4l52spn@cluster0-8jltk.mongodb.net/stash?retryWrites=true&w=majority";
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Connect to database

connectDb();

// Init Middleware for accepting body data

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.json({ msg: "Welcome to MyItems API!" }));

// Define Routes

app.use("/api/items", require("./routes/items"));

// Get port at 5000

const PORT = process.env.PORT || 5000;

// Listennig port

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
