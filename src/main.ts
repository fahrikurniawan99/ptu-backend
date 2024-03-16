import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import OperatorRouter from "./operator/route";
import CategoryRouter from "./category/route";
import ProductRouter from "./product/route";
import PaymentMethodRouter from "./payment-method/route";
import PaymentMethodCategoryRouter from "./payment-method-category/route";
import morgan from "morgan";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4003;

app.use(cors());
app.use(morgan("combined"));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use("/api", OperatorRouter);
app.use("/api", CategoryRouter);
app.use("/api", ProductRouter);
app.use("/api", PaymentMethodRouter);
app.use("/api", PaymentMethodCategoryRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
