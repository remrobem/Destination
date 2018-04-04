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

$("#formInput").on("click", function (event) {
    event.preventDefault();
    $(".formDisplay").toggleClass("noForm");
});

//Button for adding to train schedule
$(".addTrainBtn").on("click", function (event) {
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


    // full list of items to the well
    $("#trainTable > tbody").append("<tr><td>" + dispName + "</td><td>" + dispDestination + "</td><td>" +
        dispFrequency + "</td><td>" + dispNextArrival + "</td><td>" + dispWait + "</td></tr>");
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});