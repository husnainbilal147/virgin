import express from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();

  const logsActivityModel = {
    name: 'logsActivityModel',
    model: require('../models/logsActivity').default,
  };

  dependencyInjectorLoader({
    mongoConnection,
    models: [logsActivityModel],
  });

  await express({ app: expressApp });
};
