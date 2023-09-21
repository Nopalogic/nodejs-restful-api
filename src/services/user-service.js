import bcrypt from 'bcrypt';
import { prismaClient } from '../app/database.js';
import { ResponseError } from '../utils/response-error.js';
import { registerUserValidation } from '../validation/user-validation.js';
import { validate } from '../validation/validation.js';

const register = async (request) => {
	const user = validate(registerUserValidation, request);

	const countUser = await prismaClient.user.count({
		where: {
			username: user.username,
		},
	});

	if (countUser === 1) {
		throw new ResponseError(400, 'Username allreay exits');
	}

	user.password = await bcrypt.hash(user.password, 10);

	return prismaClient.user.create({
		data: user,
		select: {
			username: true,
			name: true,
		},
	});
};

export default { register };
