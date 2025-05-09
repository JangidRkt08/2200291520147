import express from "express";
import dotenv from "dotenv";
import { getNumbers } from "./controllers/numberController.js";
import router from "./routes/numbersRoute.js";
dotenv.config();

const app = express();
const PORT = 9876;

// app.get("/numbers/:numberid", getNumbers);

app.use("/evaluation-service/numbers", router);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
