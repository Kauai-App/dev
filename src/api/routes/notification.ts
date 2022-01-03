import middlewares from '../middlewares';

import { success } from '../responses/success';
import { Router, Request, Response } from 'express';


export default (app: Router) => {
  app.get('/me', middlewares.isAuth, middlewares.attachUserDetails, (req: Request, res: Response) => {
    let user_details = req.userDetails;
    return res.json(success('Success!', { user_details })).status(200).end();
  });
};
