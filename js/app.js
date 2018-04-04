// enable tooltips. disabled by default
$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

// firebase config options
var config = {
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
var database = firebase.database();


//Button for adding to train schedule
$("#addTrainBtn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    let name = $("#trainName").val().trim();
    let destination = $("#destination").val().trim();
    let startTime = $("#startTime").val().trim();
    let frequencyMinutes = $("#frequency").val().trim();
    //     let startTime = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    //     let frequencyMinutes = $("#rate-input").val().trim();

    // add train schedule to database
    database.ref().push({
        trainName: name,
        trainDestination: destination,
        trainStart: startTime,
        trainFrequency: frequencyMinutes,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });
    
    // Clears all of the text-boxes
    $("#trainName").val("");
    $("#destination").val("");
    $("#startTime").val("");
    $("#frequency").val("");
});



// database.ref().on("child_added", function (childSnapshot) {
//     // Log everything that's coming out of snapshot
//     // console.log(childSnapshot.val());
//     // console.log(childSnapshot.val().empName);
//     // console.log(childSnapshot.val().empRole);
//     // console.log(childSnapshot.val().empStart);
//     // console.log(childSnapshot.val().emprate);

//     var employeeName = childSnapshot.val().empName;
//     var employeeRole = childSnapshot.val().empRole;
//     var employeeStart = childSnapshot.val().empStart;
//     var employeeRate = childSnapshot.val().emprate;
//     var dispStart = moment.unix(employeeStart).format("MM/DD/YYYY");

// // Prettify the employee start
// var empStartPretty = moment.unix(employeeStart).format("MM/DD/YY");
// // Calculate the months worked using hardcore math
// // To calculate the months worked
// var empMonths = moment().diff(moment.unix(employeeStart, "X"), "months");
// console.log(empMonths);
// // Calculate the total billed rate
// var empBilled = empMonths * employeeRate;
// console.log(empBilled);


//     // full list of items to the well
//     $("#employee-table > tbody").append("<tr><td>" + employeeName + "</td><td>" + employeeRole + "</td><td>" +
//     empStartPretty + "</td><td>" + empMonths + "</td><td>" + employeeRate + "</td><td>" + empBilled + "</td></tr>");
//     // Handle the errors
// }, function (errorObject) {
//     console.log("Errors handled: " + errorObject.code);
// });

// // Clears all of the text-boxes
$("#trainName").val("");
$("#destination").val("");
$("#startTime").val("");
$("#frequency").val("");