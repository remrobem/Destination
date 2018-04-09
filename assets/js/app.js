


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

// enable tooltips. disabled by default
$(function () {
    $("[data-toggle='tooltip']").tooltip();
});