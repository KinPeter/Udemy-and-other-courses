const users = [{
    id: 1,
    name: 'Andrew',
    schoolID: 101
},{
    id: 2,
    name: 'Jessica',
    schoolID: 909
}];
const grades = [{
    id: 1,
    schoolID: 101,
    grade: 86
},{
    id: 2,
    schoolID: 909,
    grade: 100
},{
    id: 3,
    schoolID: 101,
    grade: 80
}];

const getUser = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id); 
        
        if (user) {
            resolve(user);
        } else {
            reject(`Unable to find user with id of ${id}`);
        }
    });
};

const getGrades = (schoolID) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolID === schoolID));
    });
};

// const getStatus = (userID) => {
//     var user;
//     return getUser(userID).then((tempUser) => {
//         user = tempUser;
//         return getGrades(user.schoolID)
//     }).then((grades) => {
//         var average = 0;

//         if (grades.length > 0) {
//             average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
//         }
//         return `${user.name} has a ${average} average in the class`;
//     });
// };

//same function with ASYNC-AWAIT
const getStatusAlt = async (userID) => {
    const user = await (getUser(userID));
    const grades = await (getGrades(user.schoolID));
    if (grades.length > 0) {
        var average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }
    return `${user.name} has a ${average} average in the class`;
};


getStatusAlt(1).then((status) => {
    console.log(status);    
}).catch((err) => {
    console.log(err);    
});


// getStatus(2).then((status) => {
//     console.log(status);    
// }).catch((err) => {
//     console.log(err);    
// });