export const routingControllerOptions = {
  cors: true,
  controllers: [`${__dirname}/../controller/**/*.ctrl.ts`],
  middlewares: [`${__dirname}/../middlewares/*.ts`],
  validation: false,
};
