import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10);

if (!process.env.PORT) process.exit(1);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to scraper API");
});

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});
