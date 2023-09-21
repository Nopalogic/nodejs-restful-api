import { logger } from './app/logging.js';
import { server } from './app/server.js';

server.listen(3001, () => {
	logger.info('Server start');
});
