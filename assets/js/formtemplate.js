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


