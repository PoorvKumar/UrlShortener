const express = require("express");
const authMiddleware = require("./middlewares/auth");
const app = express();

const connectDB = require("./connect");

const PORT = 8000;

//Middleware
app.use(express.json());
// app.use(authMiddleware);

//Routes
const urlRouter = require("./routes/urlRoutes");

app.use("/", urlRouter);

// app.listen(PORT,()=>console.log(`Server listening on PORT: ${PORT}`));

const startServer = async () => {
  try {
    await connectDB(); // Ensure MongoDB connection is established before starting the server
    app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
