const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {

	var users;
	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '1',
			name: 'yuki',
			room: 'Node Course'
		},{
			id: '2',
			name: 'grace',
			room: 'Python Course'
		},{
			id: '3',
			name: 'Jin',
			room: 'Node Course'
		}];
	})

	it('should add new user', () => {
		var users = new Users();

		var user = {
			id: '123',
			name: 'yuki',
			room: 'The Office Fans'
		};

		var resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	})

	it('should remove a user', () => {
		var user = users.removeUser('2');
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		//passing a id not in userlist
		var user = users.removeUser('aaaaa');
		expect(users.users.length).toBe(3);
	});


	it('should find user', () => {
		var userId = '1';
		var user = users.getUser(userId);
		expect(user.id).toBe(userId);

		// var user = users.getUser('1');
		// expect(user).toEqual([users.users[0]]);
	});

	it('should not find user', () => {
		//passing a id not in userlist

		var userId = 'aaaaa';
		var user = users.getUser(userId);
		expect(user).toNotExist();

		// var user = users.getUser('aaaaa');
		// expect(user).toEqual([]);
	});


	it('should return names for node course', () => {
		var userList = users.getUserList('Node Course');
		expect(userList).toEqual(['yuki', 'Jin']);
	})

	it('should return names for python course', () => {
		var userList = users.getUserList('Python Course');
		expect(userList).toEqual(['grace']);
	})	

})