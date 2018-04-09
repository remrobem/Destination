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

    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().trainDestination);
    console.log(childSnapshot.val().trainStart);
    console.log(childSnapshot.val().trainFrequency);
    console.log(childSnapshot);

    // get datafrom database ready to display
    let dispName = childSnapshot.val().trainName;
    let dispDestination = childSnapshot.val().trainDestination;
    let dispStart = childSnapshot.val().trainStart;
    let dispFrequency = childSnapshot.val().trainFrequency;

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
    let nextArrivalCount = Math.ceil((durationSinceStartUnix / frequencySeconds));
    let nextArrivalUnix = trainStartTimeUnix + (nextArrivalCount * frequencySeconds);

    dispNextArrival = moment.unix(nextArrivalUnix).format("MM/DD/YYYY HH:mm");
    dispWait = moment.unix(nextArrivalUnix, "X").diff(moment.unix(currentTimeUnix, "X"), "minutes");
    if (dispWait == "0") {
        dispWait = "Boarding now";
    }

    // add train entries to the HTML table
    $("#trainTable > tbody").append("<tr>" +
        "<td><button type='submit'><i class='fas fa-trash-alt'></i></button>" +
        "</td><td>" +
        "<button type='submit'><i class='far fa-edit'></i></button>" +
        "</td><td>" +
        dispName +
        "</td><td>" +
        dispDestination +
        "</td><td>" +
        dispFrequency +
        "</td><td>" + 
        dispNextArrival + 
        "</td><td>" + 
        dispWait + 
        "</td></tr>");

    // Handle any firebase error
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});