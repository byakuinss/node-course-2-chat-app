[{
    id: '/#sdoiufowhetwew',
    name: 'yuki',
    room: 'The Office Fans'
}]

// addUser(id, name, room)
// removeUser(id)
// getUser(id)
// getUserList(room)

class Users {
	constructor(){
		this.users = [];
	}

	addUser(id, name, room){
		var user = {id, name, room};
		this.users.push(user);
		return user;
	}

	removeUser(id){
		//filer
		var user = this.getUser(id);

		if(user){
			this.users = this.users.filter((user) => user.id !== id);
		} 
		
		return user;
	}

	getUser(id){
		return this.users.filter((user) => user.id === id)[0];
		// var user = this.users.filter((user) => user.id === id);
		// return user;
	}

	getUserList(room){
		var users = this.users.filter((user) => user.room === room);
		var namesArray = users.map((user) => user.name);

		return namesArray;
	}

}

module.exports = {Users};


// class User {
//     constructor(name, room) {
//         this.name = name;
//         this.room = room;
//     }

//     getUserDescription() {
//     	return `${this.name} is in room ${this.room}.`;
//     }
// }

// var me = new Person('yuki', 25);
// console.log(me.getUserDescription());