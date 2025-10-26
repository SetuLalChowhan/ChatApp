import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import path from "path";

const app = express();

const __dirname =path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
