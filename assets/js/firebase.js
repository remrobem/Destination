// firebase config options
const config = {
    apiKey: "AIzaSyDLQne54owNcAYfsmeK-nwE8xblJSqTwck",
    authDomain: "fir-project-13e67.firebaseapp.com",
    databaseURL: "https://fir-project-13e67.firebaseio.com",
    projectId: "fir-project-13e67",
    storageBucket: "fir-project-13e67.appspot.com",
    messagingSenderId: "747645064922"
};

// connect to firebase
firebase.initializeApp(config);

// variable for firebase reference
const database = firebase.database();

// listener to display schedule on page load and when childadded
database.ref().on("child_added", function (childSnapshot) {
    formatTableEntry(childSnapshot);
    // Handle any firebase error
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});