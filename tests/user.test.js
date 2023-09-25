import supertest from 'supertest';
import bcrypt from 'bcrypt';
import { logger } from '../src/app/logging.js';
import { server } from '../src/app/server.js';
import { createTestUser, getTestUser, removeTestUser } from './test-util.js';

describe('POST /api/users', () => {
	afterEach(async () => {
		await removeTestUser;
	});

	it('should can register new user', async () => {
		const result = await supertest(server).post('/api/users').send({
			username: 'test',
			password: 'test1234',
			name: 'test',
		});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('test');
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
			username: 'test',
			password: 'test1234',
			name: 'test',
		});

		result = await supertest(server).post('/api/users').send({
			username: 'test',
			password: 'test1234',
			name: 'test',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});
});

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
		expect(result.body.token).not.toBe('test');
	});

	it('should reject login if request invalid', async () => {
		const result = await supertest(server).post('/api/users/login').send({
			username: '',
			password: '',
		});

		logger.info(result.body);

		expect(result.status).toBe(400);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject login if password is wrong', async () => {
		const result = await supertest(server).post('/api/users/login').send({
			username: 'test',
			password: 'tst1234',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});

	it('should reject login if username is wrong', async () => {
		const result = await supertest(server).post('/api/users/login').send({
			username: 'tst',
			password: 'test1234',
		});

		logger.info(result.body);

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

describe('GET /api/users/:id', () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it('should can get current user', async () => {
		const result = await supertest(server).get('/api/users/:id').set('Authorization', 'test');

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('test');
	});

	it('should reject if token invalid', async () => {
		const result = await supertest(server).get('/api/users/:id').set('Authorization', 'tst');

		expect(result.status).toBe(401);
		expect(result.body.errors).toBeDefined();
	});
});

describe('PATCH /api/users/:id', () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it('should can update user', async () => {
		const result = await supertest(server).patch('/api/users/:id').set('Authorization', 'test').send({
			name: 'Naufal',
			password: 'test1234',
		});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('Naufal');

		const user = await getTestUser();
		expect(await bcrypt.compare('test1234', user.password)).toBe(true);
	});

	it('should can update user name', async () => {
		const result = await supertest(server).patch('/api/users/:id').set('Authorization', 'test').send({
			name: 'Naufal',
		});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('Naufal');
	});

	it('should can update user password', async () => {
		const result = await supertest(server).patch('/api/users/:id').set('Authorization', 'test').send({
			password: 'test1234',
		});

		expect(result.status).toBe(200);
		expect(result.body.data.username).toBe('test');
		expect(result.body.data.name).toBe('test');

		const user = await getTestUser();
		expect(await bcrypt.compare('test1234', user.password)).toBe(true);
	});

	it('should reject if request is not valid', async () => {
		const result = await supertest(server).patch('/api/users/:id').set('Authorization', 'tst').send({});

		expect(result.status).toBe(401);
	});
});

describe('DELETE /api/users/logout', () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeTestUser();
	});

	it('should can logout', async () => {
		const result = await supertest(server).delete('/api/users/logout').set('Authorization', 'test');

		expect(result.status).toBe(200);
		expect(result.body.data).toBe('Ok');

		const user = await getTestUser();
		expect(user.token).toBeNull();
	});

	it('should reject logout if token is invalid', async () => {
		const result = await supertest(server).delete('/api/users/logout').set('Authorization', 'salah');

		expect(result.status).toBe(401);
	});
});
