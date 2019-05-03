
//create class for users list
class Users {
    constructor() {
        //at first users will be an empty array
        this.users = [];
    }
    //method to add new users as object to the users array
    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
    //remove user from the array and return that user
    removeUser(id) {
        //find the user using our getUser() method
        var user = this.getUser(id);
        //if user found remove it from users by filtering those that do NOT match the id
        if (user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        //return user if found, return undefined if not 
        return user;
    }
    //find a user by id and return the user object
    getUser(id) {
        //filter returns an array, so we need the first object
        return this.users.filter((user) => user.id === id)[0];
        //if it finds user, it will be the result, if not, 'undefined'
    }
    //get a list of all the users by a room name and return them in an array
    getUserList(room) {
        //filter out those users whose room matches the given room
        var users = this.users.filter((user) => user.room === room);
        //create an array by only getting (.map) the users names
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }
};

module.exports = {
    Users
}