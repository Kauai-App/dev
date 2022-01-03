import { Container } from 'typedi';
import { Logger } from 'winston';

/**
 * Attach user to req.currentUser
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
  const Logger : Logger = Container.get('logger');
  try {
    const current_user = {
      user : req.token
    }
    if (
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
      (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    ) { current_user['token'] = req.headers.authorization.split(' ')[1] }
    Logger.silly('current_user: %o', current_user);
    current_user['payment_engine_token'] = process.env.PAYMENT_ENGINE_TOKEN;
    req.userDetails = current_user;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user token to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
