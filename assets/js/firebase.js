

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
    //     // Log everything that's coming out of snapshot
    //     // console.log(childSnapshot.val());
    //     // console.log(childSnapshot.val().empName);
    //     // console.log(childSnapshot.val().empRole);
    //     // console.log(childSnapshot.val().empStart);
    //     // console.log(childSnapshot.val().emprate);


    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().trainStart);
    console.log(childSnapshot.val().trainFrequency);

    let dispName = childSnapshot.val().trainName;
    let dispDestination = childSnapshot.val().trainDestination;
    let dispStart = childSnapshot.val().trainStart;
    let dispFrequency = childSnapshot.val().trainFrequency;
    let dispNextArrival = "0";
    let dispWait = "0";

    // var employeeRole = childSnapshot.val().empRole;
    // var employeeStart = childSnapshot.val().empStart;
    // var employeeRate = childSnapshot.val().emprate;
    // var dispStart = moment.unix(employeeStart).format("MM/DD/YYYY");

    // // Prettify the employee start
    // var empStartPretty = moment.unix(employeeStart).format("MM/DD/YY");
    // // Calculate the months worked using hardcore math
    // // To calculate the months worked
    // var empMonths = moment().diff(moment.unix(employeeStart, "X"), "months");
    // console.log(empMonths);
    // // Calculate the total billed rate
    // var empBilled = empMonths * employeeRate;
    // console.log(empBilled);


    // add train entries to the HTML table
    $("#trainTable > tbody").append("<tr><td>" + dispName + "</td><td>" + dispDestination + "</td><td>" +
        dispFrequency + "</td><td>" + dispNextArrival + "</td><td>" + dispWait + "</td></tr>");
    // Handle any firebase error
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


