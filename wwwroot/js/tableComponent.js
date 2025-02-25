function createTable(columns, data) {
    // Clear previous table head & body
    $("#table-head").empty();
    $("#table-body").empty();

    // Add headers dynamically
    let headerRow = "";
    columns.forEach(col => {
        headerRow += `<th>${col}</th>`;
    });
    $("#table-head").append(headerRow);

    // Add table rows dynamically
    data.forEach(row => {
        let rowHTML = "<tr>";
        columns.forEach(col => {
            rowHTML += `<td>${row[col] || "-"}</td>`; // Default to "-" if value is missing
        });
        rowHTML += "</tr>";
        $("#table-body").append(rowHTML);
    });

    // Initialize DataTable (with destroy option to prevent duplicate initialization)
    if ($.fn.DataTable.isDataTable("#dynamicTable")) {
        $("#dynamicTable").DataTable().destroy();
    }
    $("#dynamicTable").DataTable({
        paging: true,      // Enable Pagination
        searching: true,   // Enable Search
        ordering: true,    // Enable Sorting
        responsive: true   // Make it Responsive
    });
}
