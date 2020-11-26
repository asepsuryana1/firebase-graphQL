const firebase = require("firebase");

const getUsers = () => {
    const userReference = firebase.database().ref("/Users/");
    //Attach an asynchronous callback to read the data
    userReference.on("value", function(snapshot) {
      console.log(snapshot.val());
      res.json(snapshot.val());
      userReference.off("value");
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
      res.send("The read failed: " + errorObject.code);
    });
}