import { prismaClient } from '../src/app/database.js';
import bcrypt from 'bcrypt';

export const removeTestUser = async () => {
	await prismaClient.user.deleteMany({
		where: {
			username: 'test',
		},
	});
};

export const createTestUser = async () => {
	await prismaClient.user.create({
		data: {
			username: 'test',
			password: await bcrypt.hash('test1234', 10),
			name: 'test',
			token: 'test',
		},
	});
};

export const getTestUser = async () => {
	return prismaClient.user.findUnique({
		where: {
			username: 'test',
		},
	});
};

export const removeAllTestContact = async () => {
	await prismaClient.contact.deleteMany({
		where: {
			username: 'test',
		},
	});
};

export const createTestContact = async () => {
	await prismaClient.contact.create({
		data: {
			username: 'test',
			firstName: 'Naufal',
			lastName: 'Adhi',
			email: 'test@test.com',
			phone: '12345678',
		},
	});
};

export const createManyTestContacts = async () => {
	for (let i = 0; i < 15; i++) {
		await prismaClient.contact.create({
			data: {
				username: 'test',
				firstName: `test${i}`,
				lastName: `test${i}`,
				email: `test${i}.test.com`,
				phone: `13245678${i}`,
			},
		});
	}
};

export const getTestContact = async () => {
	return prismaClient.contact.findFirst({
		where: {
			username: 'test',
		},
	});
};
