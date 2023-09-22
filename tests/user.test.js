import supertest from 'supertest';
import { logger } from '../src/app/logging.js';
import { server } from '../src/app/server.js';
import { createTestUser, removeTestUser } from './test-util.js';

// describe('POST /api/users', () => {
// 	afterEach(async () => {
// 		await removeTestUser;
// 	});

// 	it('should can register new user', async () => {
// 		const result = await supertest(server).post('/api/users').send({
// 			username: 'test',
// 			password: 'test1234',
// 			name: 'test',
// 		});

// 		expect(result.status).toBe(200);
// 		expect(result.body.data.username).toBe('test');
// 		expect(result.body.data.name).toBe('test');
// 		expect(result.body.data.password).toBeUndefined();
// 	});

// 	it('should reject if request is invalide', async () => {
// 		const result = await supertest(server).post('/api/users').send({
// 			username: '',
// 			password: '',
// 			name: '',
// 		});

// 		logger.info(result.body);

// 		expect(result.status).toBe(400);
// 		expect(result.body.errors).toBeDefined();
// 	});

// 	it('should reject if username already exist', async () => {
// 		let result = await supertest(server).post('/api/users').send({
// 			username: 'test',
// 			password: 'test1234',
// 			name: 'test',
// 		});

// 		result = await supertest(server).post('/api/users').send({
// 			username: 'test',
// 			password: 'test1234',
// 			name: 'test',
// 		});

// 		logger.info(result.body);

// 		expect(result.status).toBe(400);
// 		expect(result.body.errors).toBeDefined();
// 	});
// });

describe('POST /api/users/login', () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it('should can login', async () => {
		const result = await supertest(server).post('/api/users/login').send({
			username: 'test',
			password: 'test1234',
		});

		logger.info(result.body);

		expect(result.status).toBe(200);
		expect(result.body.data.token).toBeDefined();
		expect(result.body.token).not.toBeDefined('test');
	});
});
