import { Request, Response } from 'express';

export const root = (req: Request, res: Response) => {
	return res.status(200).json({
		status: 'OK',
		message: 'Welcome to scraper API',
	});
};
