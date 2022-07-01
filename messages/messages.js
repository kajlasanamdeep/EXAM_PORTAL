"use strict";
const MESSAGES={
	SUCCESS: "SUCCESS",
	FORBIDDEN:"FORBIDDEN",
	SERVER_ERROR:"SOME ERROR OCCURED ON THE SERVER",
	INVALID_URL:"INVALID_URL",
	UNAUTHORIZED:"UNAUTHORIZED_ACCESS",
	INVALID_TOKEN:"INVALID_TOKEN",
	EMAIL_ALREDAY_TAKEN: "EMAIL_ALREDAY_TAKEN",
	INVALID_PASSWORD: "INVALID_PASSWORD",
	PASSWORD_CHANGED_SUCCESSFULLY:"PASSWORD_CHANGED_SUCCESSFULLY",
	MOBILE_NUMBER_ALREADY_TAKEN:"MOBILE_NUMBER_ALREADY_TAKEN",
	USER_NOT_FOUND:"USER_NOT_FOUND",
	USER_NOT_ALLOWDED_TO_ACCESS_THIS_PAGE:"USER_NOT_ALLOWDED_TO_ACCESS_THIS_PAGE",
	USER_NOT_ALLOWDED_TO_LOGIN:"USER_NOT_ALLOWDED_TO_LOGIN",
	USER_REGISTER_SUCCESSFULLY:"USER_REGISTER_SUCCESSFULLY",
	USER_LOGIN_SUCCESSFULLY:"USER_LOGIN_SUCCESSFULLY",
	USER_DECLINED_SUCCESSFULLY:"USER_DECLINED_SUCCESSFULLY",
	USER_APPROVED_SUCCESSFULLY:"USER_APPROVED_SUCCESSFULLY",
	USER_DELETED_SUCCESSFULLY:"USER_DELETED_SUCCESSFULLY",
	USER_LOGOUT_SUCCESSFULLY:"USER_LOGOUT_SUCCESSFULLY",
	STUDENT_REGISTERED_SUCCESSFULLY:"STUDENT_REGISTERED_SUCCESSFULLY",
	STUDENT_WITH_THIS_DETAILS_ALREADY_REGISTERED:"STUDENT_WITH_THIS_DETAILS_ALREADY_REGISTERED",
	STUDENT_NOT_ALLOWDED_TO_TAKE_EXAM:"STUDENT_NOT_ALLOWDED_TO_TAKE_EXAM",
	COURSE_REGISTERED_SUCCESSFULLY:"COURSE_REGISTERED_SUCCESSFULLY",
	COURSE_ALREADY_EXIST:"COURSE_ALREADY_EXIST",
	COURSE_NOT_FOUND:"COURSE_NOT_FOUND",
	SUBJECT_REGISTERED_SUCCESSFULLY:"SUBJECT_REGISTERED_SUCCESSFULLY",
	SUBJECT_ALREADY_EXIST:"SUBJECT_ALREADY_EXIST",
	INVALID_EXAM_CODE:'INVALID_EXAM_CODE',
	EXAM_REGISTERED_SUCCESSFULLY:"EXAM_REGISTERED_SUCCESSFULLY",
	EXAM_ALREADY_COMPLETED:"EXAM_ALREADY_COMPLETED",
	DASHBOARD_LOADED_SUCCESSFULLY:"DASHBOARD_LOADED_SUCCESSFULLY",
	INCORRECT_DETAILS:"INCORRECT_DETAILS"
};
module.exports = {
	MESSAGES:MESSAGES
};