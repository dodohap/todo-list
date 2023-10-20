import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./config/index";
import { IRoutes } from "./interfaces/routes.interface";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { errorCatcher } from "./middlewares/errorcatcher.middlerware";

export class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.port = PORT || 3000;

    this.initializeMiddlewares();
    this.intializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Sever is running on port: " + this.port);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        origin: ["http://localhost:5173", "http://localhost:3000"],
        credentials: true,
      })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cookieParser());
  }

  private intializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.app.use("/api", route.router);
    });

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).send("Endpoint not found!");
    });

    this.app.use(errorCatcher);

    this.app.on("exit", (code) => {
      console.log(code);
    });
  }
}
