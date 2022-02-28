import "reflect-metadata";
import express from "express";
import { useContainer as ormContainer, createConnection } from "typeorm";
import bodyParser from "body-parser";
import { Container } from "typedi";
import {
  useContainer as routingContainer,
  useExpressServer,
} from "routing-controllers";
import { routingControllerOptions } from "./util/RoutingConfig";
import { useSwagger } from "./util/swagger";
import path from "path";
import { checkEntityExist } from "./util/entityCheck";
import {logger} from "./util/logger";

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setEnv();
    this.setDatabase();
    this.setMiddlewares();
  }

  // DB 셋팅
  private async setDatabase(): Promise<void> {
    try {
      await createConnection().then(async (connection) => {
        await this.checkEntityExist();
      });
    } catch (error) {
      logger.error(`DB connection failed. Details: ${error}`);
    }
  }

  // 미들웨어 셋팅
  private setMiddlewares(): void {
    this.app.use(bodyParser.json({limit: '20mb'}));
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  // express 서버 스타트
  public async createExpressServer(): Promise<void> {
    try {
      routingContainer(Container);
      ormContainer(Container);
      useExpressServer(this.app, routingControllerOptions);
      useSwagger(this.app);

      this.app.listen(4000, () => {
        logger.info("Server Start at 4000 port");
      });
    } catch (error) {
      logger.error(`Failed to create ExpressServer. Details: ${error}`);
    }
  }

  // NODE_ENV MODE에 따른 .env 파일 설정
  public async setEnv(): Promise<void> {
    if (process.env.NODE_ENV === "dev") {
      require("dotenv").config({
        path: path.join(__dirname, "../.env.dev"),
      });
    } else if (process.env.NODE_ENV === "beta") {
      require("dotenv").config({
        path: path.join(__dirname, "../.env.beta"),
      });
    }else if (process.env.NODE_ENV === "prod") {
      require("dotenv").config({
        path: path.join(__dirname, "../.env.prod"),
      });
    }
  }
  // DB연결 후 site_config, dashboard, footer가 있는지 체크 후 없으면 생성하는 함수
  public async checkEntityExist(): Promise<void> {
    try {
      const checkSiteConfig = new checkEntityExist();
      await checkSiteConfig.checkAdmin();
    } catch (error) {
      logger.error(` DB연결 후 admin이 있는지 체크 후 없으면 생성하는 할 때 실패했습니다. Details: ${error}`);
    }
  }
}
