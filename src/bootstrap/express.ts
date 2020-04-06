import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongooseMorgan from 'mongoose-morgan';
import passport from 'passport';
import routes from '../api';
import config from '../config';
import middlewares from '../middlewares';

export default ({ app }: { app: express.Application }) => {
  app.use(cors());
  app.use(
    mongooseMorgan({
      collection: config.logsApi,
      connectionString: config.databaseURL,
    }),
  );
  app.use(bodyParser.json());
  app.use(config.api.prefix, routes());
  
  // Catch All
  app.use((req, res, next) => {
    const err = new Error('No route found');
    err['status'] = 404;
    next(err);
  });

  // Error Handling
  app.use((err, req, res, next) => {
    middlewares.errorHandler(err, req, res, next);
  });
};
