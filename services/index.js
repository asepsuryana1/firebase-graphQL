const firebase = require("firebase");

const getUsers = () => {
    const userReference = firebase.database().ref("/Users/");
    //Attach an asynchronous callback to read the data
    return (new Promise((resolve, reject) => {
        userReference.on("value", function (snapshot) {
            console.log(snapshot.val());
            const folder = snapshot.val();
            if (folder === null) {
                resolve([])
            } else {
                const data = Object.keys(folder).map(o => Object.assign({ userName: o }, folder[o]))
                resolve(data);
            }
            userReference.off("value");
        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            reject("The read failed: " + errorObject.code);
        });
    }))
}

const createUser = (params) => {
    const referencePath = '/Users/' + params.userName + '/';
    const userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.set({ Name: params.name, Age: params.age }, function (error) {
            if (error) {
                reject("Data could not be saved." + error);
            } else {
                resolve(params);
            }
        });
    }))
}

const updateUser = (params) => {
    var referencePath = '/Users/' + params.userName + '/';
    var userReference = firebase.database().ref(referencePath);
    return (new Promise((resolve, reject) => {
        userReference.update({ Name: params.name, Age: params.age }, function (error) {
            if (error) {
                reject("Data could not be updated." + error);
            } else {
                resolve(params);
            }
        });
    }))
}

const deleteUser = (params) => {
    var userName = req.params.username;
    return (new Promise((resolve, reject) => {
        var referencePath = '/Users/' + paramsuserName + '/';
        var userReference = firebase.database().ref(referencePath);
        userReference.remove((error) => {
            if (error) {
                reject("Data could not be deleted." + error);
            } else {
                resolve(params);
            }
        })
    }))
}

module.exports = { getUsers, createUser, updateUser, deleteUser }