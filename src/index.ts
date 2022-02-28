import { App } from "./app";
import {logger} from "./util/logger";

try {
  const app = new App();
  app.createExpressServer();
} catch (err) {
  logger.error(`Failed to call createExpressServer. Details: ${err}`);
}
