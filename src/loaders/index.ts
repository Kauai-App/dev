import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import './events';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✅ DB loaded and connected!');

  const notificationModel = {
    name: 'notificationModel',
    model: require('../models/Notification').default,
  };

  dependencyInjectorLoader({
    mongoConnection,
    models: [
      notificationModel
    ],
  });
  Logger.info('✅ Dependency Injector loaded');

  expressLoader({ app: expressApp });
  Logger.info('✅ Express loaded');
};
