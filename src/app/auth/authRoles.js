/**
 * Authorization Roles
 */
const authRoles = {
	customer: ['customer'],
	admin: ['admin'],
	vendor: ['vendor'],
	user: ['admin','user'],
	onlyGuest: []
};

export default authRoles;
