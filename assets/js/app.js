
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


// delete train
// $(".deleteBtn").on("click", function (event) {
//     // event.preventDefault();
//     let currentRow=$(this).closest("tr"); 
//     let key = currentRow.find(".key").text();
//     console.log(key);
//     // $("#pageForm").empty();
//     // $("#modalForm").append(formHTML);
//     // $("#modalContent").append(modalFooter);
//     // RefreshEventListner()
// });


// refresh the event listners. used when the forms are dynamically loaded onto page or modal
function RefreshEventListner() {

    //event listener - button selected to add to train schedule
    $("#addTrainBtn").on("click", function (event) {
        event.preventDefault();
        // input for new train
        let name = $(".trainName").val().trim();
        let destination = $(".destination").val().trim();
        let startTime = $("#startTimeHH").val().trim() + $("#startTimeMM").val().trim();
        let frequencyMinutes = $("#frequency").val().trim();

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
        $("#startTimeHH").val("");
        $("#startTimeMM").val("");
        $("#frequency").val("");
    });

    // evenet listener - autotab from HH to MM
    $("#startTimeHH").on("keyup", function () {
        if (this.value.length == this.maxLength) {
            $(this).next(".form-control").focus();
        }
    });

    // evenet listener - autotab from MM to frequency
    $("#startTimeMM").on("keyup", function () {
        if (this.value.length == this.maxLength) {
            $(this).parent().next(".form-group").children("input.form-control").focus();
        }
    });

    // event listener - clear modal input fields and the form when modal closed
    $("#trainAddModal").on("hidden.bs.modal", function () {
        $(this).find("form").trigger("reset");
        $("#modalForm").empty();
        $(".modal-footer").empty();
    });

    // event listener - clear the page form when close is selected
    $("#closeBtn").on("click", function (event) {
        event.preventDefault();    
        $("#pageForm").empty();          
    });
};

// build train table entry based on data from database
function formatTableEntry(childSnapshot) {
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().trainStart);
    console.log(childSnapshot.val().trainFrequency);
    console.log(childSnapshot.key);

    // get datafrom database ready to display
    let dispName = childSnapshot.val().trainName;
    let dispDestination = childSnapshot.val().trainDestination;
    let dispStart = childSnapshot.val().trainStart;
    let dispFrequency = childSnapshot.val().trainFrequency;
    let tableKey = childSnapshot.key;

    //convert the frequency minutes into seconds
    let frequencySeconds = (childSnapshot.val().trainFrequency) * 60;
    // get current Unix time
    let currentTimeUnix = moment().unix();
    // get the train start time in Unix time
    let trainStartTimeUnix = moment(childSnapshot.val().trainStart, "HHmm").unix();

    // get the seconds since the train start, divide it by the frequency and 
    // round up to get the next occurance number of a train arrival. 
    // multiply that by the frequency and add to the train start time to get the next arrival in Unix time  
    let durationSinceStartUnix = moment(moment.unix(currentTimeUnix, "X").diff(moment.unix(trainStartTimeUnix, "X"))).unix();
    let nextArrivalCount = Math.ceil(durationSinceStartUnix / frequencySeconds);
    let nextArrivalUnix = trainStartTimeUnix + (nextArrivalCount * frequencySeconds);

    dispNextArrival = moment.unix(nextArrivalUnix).format("HH:mm | MM/DD/YYYY");
    dispWait = Math.floor(moment.unix(nextArrivalUnix, "X").diff(moment.unix(currentTimeUnix, "X"), "minutes")) + 1;

    // add train entries to the HTML table
    $("#trainTable > tbody").append("<tr><td>" +
        dispName +
        "</td><td>" +
        dispDestination +
        "</td><td>" +
        dispFrequency +
        "</td><td>" +
        dispNextArrival +
        "</td><td>" +
        dispWait +
        "</td><td id='noDisplay'" +
        tableKey +
        "</td></tr>");

    // edit and delete buttons AudioDestinationNode. Functionality for buttons not complete
    // $("#trainTable > tbody").append("<tr>" +
    //     "<td><button type='button' class='deleteBtn'><i class='fas fa-trash-alt'></i></button>" +
    //     "</td><td>" +
    //     "<button type='button'><i class='far fa-edit'></i></button>" +
    //     "</td><td>" +
    //     dispName +
    //     "</td><td>" +
    //     dispDestination +
    //     "</td><td>" +
    //     dispFrequency +
    //     "</td><td>" + 
    //     dispNextArrival + 
    //     "</td><td>" + 
    //     dispWait +
    //     "</td><td class='key' style='display:none'>" +
    //     tableKey +
    //     "</td></tr>");



};

// enable tooltips. disabled by default
$(function () {
    $("[data-toggle='tooltip']").tooltip();
});