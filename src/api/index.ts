import { Router } from 'express';
import facebookAuth from './routes/social-media/facebook/auth';
import facebook from './routes/social-media/facebook';

export default () => {
	const app = Router();
	facebookAuth(app);
	facebook(app);

	return app
}