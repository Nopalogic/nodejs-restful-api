import supertest from 'supertest';
import { createTestUser, removeAllTestContact, removeTestUser } from './test-util.js';
import { server } from '../src/app/server.js';
import { logger } from '../src/app/logging.js';

describe('POST /api/contacts', () => {
	beforeEach(async () => {
		await createTestUser();
	});

	afterEach(async () => {
		await removeAllTestContact();
		await removeTestUser();
	});

	it('should can create new contact', async () => {
		const result = await supertest(server).post('/api/contacts').set('Authorization', 'test').send({
			firstName: 'test',
			lastName: 'test',
			email: 'test@test.com',
			phone: '12345678',
		});

		logger.info(result);

		expect(result.status).toBe(200);
		expect(result.body.data.id).toBeDefined();
		expect(result.body.data.firstName).toBe('test');
		expect(result.body.data.lastName).toBe('test');
		expect(result.body.data.email).toBe('test@test.com');
		expect(result.body.data.phone).toBe('12345678');
	});
});
