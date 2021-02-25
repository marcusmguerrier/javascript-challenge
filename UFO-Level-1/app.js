// Get data 
var tableData = data;
var tblColumns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// HTML object references
var tbody = d3.select("tbody");
var searchDate = d3.select("#searchDate");
var btnSearch = d3.select("#btnSearch");
var btnReset = d3.select("#btnReset");

// arrow function
var loadTableRows = (whichData) => { // Parameter "whichData" is the data to loop through; makes this re-usable
	// Delete table rows
    tbody.html("");
	
	//Loop and add new table row for each row 
	whichData.forEach(dataRow => { // Loop through each row:
		//New row
		var tblRow = tbody.append("tr");  
		
		//Loop through each column
		tblColumns.forEach(column => tblRow.append("td").text(dataRow[column]))
	});
}

//first page load only
loadTableRows(tableData);

/**********************************
 Event Listeners 
**********************************/

// Search button
btnSearch.on("click", () => {
	// make sure page doesn't refresh on events
	d3.event.preventDefault();
	
	// retrieve search:
    var searchedDate = searchDate.property("value");
	
	// Filter
    var tableData_Filtered = tableData.filter(tableData => tableData.datetime === searchedDate);
	
	//Load new data
	if(tableData_Filtered.length !== 0) {
		loadTableRows(tableData_Filtered);
	}
	else {
		// Clear out previously loaded HTML:
		tbody.html("");
		
		//  "No rows match"
		tbody.append("tr").append("td").text("Dang it - no sightings on this date");
	}
})

// Reset button - click 
btnReset.on("click", () => {
	// window.location.href = "index.html";
	document.getElementById("searchDate").value='';
	
	// Load original dataset
	loadTableRows(tableData);
})