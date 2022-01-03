import { Logger } from 'winston';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { success } from '../responses/success';
import { failure } from '../responses/failure';
import { Router, Request, Response } from 'express';

import middlewares from '../middlewares';
import MessageService from '../../services/MessageService';

export default (app: Router) => {

  app.get('/my_messages',
    middlewares.isAuth, middlewares.attachUserDetails,  
    async (req: Request, res: Response) => {
      const logger:Logger = Container.get('logger');
      try {
        let user_details = req.userDetails;
        const messageServiceInstance = Container.get(MessageService);
        const { messages_list } = await messageServiceInstance.getMyMessages(user_details.user);
        return res.json(success('Member messages successfully retrieved!', messages_list)).status(200).end();
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return res.json(failure('Failed to get member messages!')).status(400).end();
      }
    },
  );

  app.get('/message',
    celebrate({
      query: Joi.object({
        message_id: Joi.string().required()
      })
    }),
    middlewares.isAuth, middlewares.attachUserDetails,  
    async (req: Request, res: Response) => {
      const logger:Logger = Container.get('logger');
      try {
        let user_details = req.userDetails;
        const messageServiceInstance = Container.get(MessageService);
        const { message } = await messageServiceInstance.getMessage(user_details.user, String(req.query.message_id));
        return res.json(success('Message uccessfully retrieved!', message)).status(200).end();
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return res.json(failure('Failed to get message!')).status(400).end();
      }
    },
  );
};
