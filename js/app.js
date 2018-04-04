var config = {
    apiKey: "AIzaSyDLQne54owNcAYfsmeK-nwE8xblJSqTwck",
    authDomain: "fir-project-13e67.firebaseapp.com",
    databaseURL: "https://fir-project-13e67.firebaseio.com",
    projectId: "fir-project-13e67",
    storageBucket: "fir-project-13e67.appspot.com",
    messagingSenderId: "747645064922"
};
firebase.initializeApp(config);


var database = firebase.database();


//Button for adding Employees
// $("#add-employee-btn").on("click", function (event) {
//     event.preventDefault();
//     // Grabs user input
//     var empName = $("#employee-name-input").val().trim();
//     var empRole = $("#role-input").val().trim();
//     var empStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
//     var empRate = $("#rate-input").val().trim();


//     database.ref().push({
//         empName: empName,
//         empRole: empRole,
//         empStart: empStart,
//         emprate: empRate,
//         dateAdded: firebase.database.ServerValue.TIMESTAMP

//     });
// });



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
// $("#employee-name-input").val("");
// $("#role-input").val("");
// $("#start-input").val("");
// $("#rate-input").val("");

