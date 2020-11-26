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
    return (new Promise((resolve, reject) => {
        const referencePath = '/Users/' + params.userName + '/';
        const userReference = firebase.database().ref(referencePath);
        userReference.set({ Name: params.name, Age: params.age }, function (error) {
            if (error) {
                res.send("Data could not be saved." + error);
            } else {
                res.send("Data saved successfully.");
            }
        });
    }))
}

const updateUser = () => {

}

const deleteUser = () => {

}

module.exports = { getUsers, createUser, updateUser, deleteUser }