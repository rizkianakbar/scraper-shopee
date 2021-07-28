import app from '@server';
import logger from '@shared/Logger';

const PORT: number = parseInt(process.env.PORT as string, 10);

if (!process.env.PORT) process.exit(1);
app.listen(PORT, () => {
	logger.info('Express server started on port: ' + PORT);
});
