import { Container } from 'typedi';
import LoggerInstance from './logger';
import Messaging from '../integration/cheetah/Messaging';

export default ({ models }: { mongoConnection; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const cheetahMessaging = new Messaging();

    Container.set('logger', LoggerInstance);
    Container.set('cheetahMessaging', cheetahMessaging);
    return;
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
