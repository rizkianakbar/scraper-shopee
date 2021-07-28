import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import axios from "axios";

dotenv.config();

const app = express();
const baseUrl: string = `https://shopee.co.id/api`;

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security
if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Welcome to scraper API");
});

/*
  GET Product Details
  examples  : shopId = 120033763
              itemId = 6235683454
*/
app.get("/products/:shopId/:itemId", async (req, res) => {
  const { itemId, shopId } = req.params;

  try {
    const response = await axios(
      `${baseUrl}/v2/item/get?itemid=${itemId}&shopid=${shopId}`
    );
    res.json(response.data);
  } catch (error) {
    res.json(error);
  }
});
export default app;
