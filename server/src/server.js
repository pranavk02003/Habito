import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import habitRoutes from "./routes/habitRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",              
      "https://habito-three.vercel.app"    
    ],
    credentials: true,
  })
);

/* Middleware */
app.use(express.json());

/* Routes */
app.use("/api/auth", authRoutes);
app.use("/api/habits", habitRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Habito backend running 🚀");
});


app.use(errorHandler);


connectDB();


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});