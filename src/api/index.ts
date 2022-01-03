import { Router } from 'express';
import notification from './routes/notification';

export default () => {
	const app = Router();
	notification(app);
	return app
}