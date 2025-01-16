import express, { Request, Response } from "express";
import router from "./src/routes/routes";
import cors from "cors";

const app = express();
const port = 4000;
app.use(express.json());

// Enable CORS with default configuration (allowing all origins)
app.use(cors());

// route middelware
app.use("/api", router);

app.get("/health_check", (req: Request, res: Response) => {
  res.status(200).json({ success: true, message: "SUCCESS" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
