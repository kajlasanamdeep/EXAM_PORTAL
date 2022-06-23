const APP_CONSTANTS = require("../constant/APP_CONSTANTS");
const universalFunction = require("../lib/universal-function");
const users = require("../models/users");
const { connect } = require('./connection');

async function createAdmin() {
	await connect();
	let firstName = 'Admin';
	let lastName = 'Account';
	let hashPassword = await universalFunction.hashPasswordUsingBcrypt('123456');
	await users.create({
		firstName: firstName,
		lastName: lastName,
		email: 'admin@email.com',
		password: hashPassword,
		mobileNumber: '987654321',
		userType: APP_CONSTANTS.ACCOUNT_TYPE.ADMIN,
		status: APP_CONSTANTS.ACCOUNT_STATUS.APPROVED
	});
	console.log('Admin Created');
}

createAdmin();