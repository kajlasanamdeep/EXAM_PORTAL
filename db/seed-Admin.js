const { hashPasswordUsingBcrypt } = require("../lib/universal-function");
const users = require("../models/users");
const { connect } = require("./connection");

async function createAdmin() {
	await connect();
	let firstName = 'Admin';
	let lastName = 'Account';
	let hashPassword = await hashPasswordUsingBcrypt('123456');
	await users.create({
		firstName: firstName,
		lastName: lastName,
		email: 'admin@email.com',
		password: hashPassword,
		mobileNumber: '987654321',
		userType: 'ADMIN',
		status: 'APPROVED',
	});
	console.log('Admin Created');
}

createAdmin();