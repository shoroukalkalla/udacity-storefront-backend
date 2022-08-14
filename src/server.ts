import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import indexRoutes from "./routes/index";

const app: express.Application = express();
const address: string = "http://localhost:4000";
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(morgan("dev"));

app.use("/", indexRoutes);

app.all("*", (req: Request, res: Response): Response => {
   return res.status(404).json({
      error: `This resource: ${req.originalUrl} does not exist`,
   });
});

app.listen(PORT, function () {
   console.log(`starting app on: ${address}`);
});

export default app;
