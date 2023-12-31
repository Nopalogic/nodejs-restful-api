import { prismaClient } from '../app/database.js';
import { createContactValidation } from '../validation/contact-validation.js';
import { validate } from '../validation/validation.js';

const createContact = async (user, request) => {
	const contact = validate(createContactValidation, request);
	contact.username = user.username;

	return prismaClient.contact.create({
		data: contact,
		select: {
			id: true,
			firstName: true,
			lastName: true,
			email: true,
			phone: true,
		},
	});
};

export default { createContact };
