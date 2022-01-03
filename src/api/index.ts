import { Router } from 'express';
import message from './routes/message';
import notification from './routes/notification';

export default () => {
	const app = Router();
	message(app);
	notification(app);
	return app
}