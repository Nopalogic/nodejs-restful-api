import supertest from 'supertest';
import { prismaClient } from '../src/app/database.js';
import { server } from '../src/app/server.js';
import { logger } from '../src/app/logging.js';

describe('POST /api/users', () => {
	afterEach(async () => {
		await prismaClient.user.deleteMany({
			where: {
				username: 'nopalogic',
			},
		});
	});

	it('should can register new user', async () => {
		const result = await supertest(server).post('/api/users').send({
			username: 'nopalogic',
			password: 'test1234',
			name: 'Naufal Adhi',
		});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('nopalogic');
		expect(result.body.data.name).toBe('Naufal Adhi');
		expect(result.body.data.password).toBeUndefined();
	});

	it('should reject if request is invalide', async () => {
		const result = await supertest(server).post('/api/users').send({
			username: '',
			password: '',
			name: '',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject if username already exist', async () => {
		let result = await supertest(server).post('/api/users').send({
			username: 'nopalogic',
			password: 'test1234',
			name: 'Naufal Adhi',
		});

		result = await supertest(server).post('/api/users').send({
			username: 'nopalogic',
			password: 'test1234',
			name: 'Naufal Adhi',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});
});
