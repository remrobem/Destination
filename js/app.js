const formHTML = `<form>
<div class="form-group">
    <label for="trainName" class="col-form-label">Name:</label>
    <input type="text" required class="form-control trainName" maxlength="50">
</div>
<div class="form-group">
    <label for="destination" class="col-form-label">Destination:</label>
    <input type="text" required class="form-control destination" maxlength="50">
</div>
<div class="form-group">
    <label for="startTime" class="col-form-label">Time of First Train:</label>
    <input type="text" required class="form-control" id="startTimeHH" placeholder="HH" pattern="([01]?[0-9]|2[0-3])" maxlength="2"> :
    <input type="text" required class="form-control" id="startTimeMM" placeholder="MM" pattern="[0-5][0-9]" maxlength="2"> 24 hour format
</div>
<div class="form-group">
    <label for="frequency" class="col-form-label">Frequency:</label>
    <input type="number" required class="form-control" id="frequency" min="1" step="1" placeholder="minutes">
</div>
</form>`;

const modalFooter = `<div class="modal-footer">
<button type="button" class="btn btn-primary" id="addTrainBtn">Add Train</button>
<button type="button" class="btn btn-secondary" id="closeBtn" data-dismiss="modal">Close</button>
</div>`;

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

// add form to page body when page Add Train button selected
// removed when close button selected
$("#addTrainFormBtn").on("click", function (event) {
    event.preventDefault();
    $("#modalForm").empty();
    $("#pageForm").append(formHTML);
    $("#pageForm").append(modalFooter);
    RefreshEventListner()
});

// add form to modal body when modal Add Train button selected
// removed when modal closed.
$("#addTrainModalBtn").on("click", function (event) {
    event.preventDefault();
    $("#pageForm").empty();
    $("#modalForm").append(formHTML);
    $("#modalContent").append(modalFooter);
    RefreshEventListner()
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


    // add train entries to the HTML table
    $("#trainTable > tbody").append("<tr><td>" + dispName + "</td><td>" + dispDestination + "</td><td>" +
        dispFrequency + "</td><td>" + dispNextArrival + "</td><td>" + dispWait + "</td></tr>");
    // Handle any firebase error
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// refresh the event listners. used when the forms are dynamically loaded onto page or modal
function RefreshEventListner() {

    //Button for adding to train schedule
    $("#addTrainBtn").on("click", function (event) {
        event.preventDefault();
        // Grabs user input
        let name = $(".trainName").val().trim();
        let destination = $(".destination").val().trim();
        let startTime = $("#startTimeHH").val().trim() + ":" + $("#startTimeMM").val().trim();
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
        $(".trainName").val("");
        $(".destination").val("");
        // $(".startTime").val("");
        $("#startTimeHH").val("");
        $("#startTimeMM").val("");
        $("#frequency").val("");
    });

    // autotab from HH to MM
    $("#startTimeHH").on("keyup", function () {
        if (this.value.length == this.maxLength) {
            $(this).next(".form-control").focus();
        }
    });

    // autotab from MM to frequency
    $("#startTimeMM").on("keyup", function () {
        if (this.value.length == this.maxLength) {
            $(this).parent().next(".form-group").children("input.form-control").focus();
        }
    });

    // clear modal input fields and the form when modal closed
    $("#trainAddModal").on("hidden.bs.modal", function () {
        $(this).find("form").trigger("reset");
        $("#modalForm").empty();
        $(".modal-footer").empty();
    });

    $("#closeBtn").on("click", function (event) {
        event.preventDefault();    
        $("#pageForm").empty();          
    });
    

};

// enable tooltips. disabled by default
$(function () {
    $("[data-toggle='tooltip']").tooltip();
});