document.addEventListener("DOMContentLoaded", function () {
            const columnDefs = [
                 {
            headerName: "",
            field: "checkbox",
            checkboxSelection: true,
            headerCheckboxSelection: true, // Enables "Select All" checkbox in the header
            width: 50,
            resizable: true,
            // pinned: "left"
            cellStyle: { display: "flex", alignItems: "center" }
        },
        { headerName: "Country", field: "country", sortable: true, filter: true,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" }, cellRenderer: function (params) {
                return `<img src="wwwroot/Ellipse 270.png" width="20" height="15" style="margin-right: 5px;"> ${params.value}`;
            } },
        { headerName: "Zone", field: "zone", sortable: true, filter: true,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" } },
        { headerName: "Sub Zone", field: "subZone", sortable: true, filter: true ,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" }},
        { headerName: "RO", field: "ro", sortable: true, filter: true,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" } },
        { headerName: "State", field: "state", sortable: true, filter: true ,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" }},
        { headerName: "City", field: "city", sortable: true, filter: true ,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" }},
        { headerName: "District", field: "district", sortable: true, filter: true,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" }},
        { headerName: "Tehshil", field: "tehsil", sortable: true, filter: true ,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" }},
        { headerName: "Pincode", field: "pincode", sortable: true, filter: true,resizable:true,width:110 ,cellStyle: { display: "flex", alignItems: "center" }},
         { headerName: "District Code", field: "districtcode",pinned:"right", sortable: true, filter: true,resizable:true,width:110,cellStyle: { display: "flex", alignItems: "center" } },
    //     { 
    //         headerName: "Area Code Status", 
    //         field: "areaCodeStatus",
    //         pinned:"right",
    //         resizable:true,
    //         cellStyle: { display: "flex", alignItems: "center" },
    //         cellRenderer: function (params) {
    //             if (!params.value) {
    //                 console.warn("⚠️ Missing areaCodeStatus value for:", params);
    //                 return "";
    //             }
    //             let statusClass = "";
    //     let bgColor = "";
    //     let textColor = "#222222";
    //             if (params.value === "Sent to Approval") {
    //         statusClass = "status-sent";
    //         bgColor = "#EDE7FB";
    //     } else if (params.value === "Rejected") {
    //         statusClass = "status-rejected";
    //         bgColor = "#F8D4D3"
    //     } else if (params.value === "Approved") {
    //         statusClass = "status-approved";
    //         bgColor = "#DAF4AA";
    //     }
    //     return `<span class="status-badge ${statusClass}" 
    //                 >
    //                 ${params.value}
    //             </span>`;
    // }
    // },
    { 
    headerName: "Area Code Status", 
    field: "areaCodeStatus",
    pinned: "right",
    resizable: true,
    cellStyle: { display: "flex", alignItems: "center" },
    cellRenderer: function (params) {
        if (!params.value) {
            console.warn("⚠️ Missing areaCodeStatus value for:", params);
            return "";
        }

        let statusClass = "";
        if (params.value === "Sent to Approval") statusClass = "status-sent";
        else if (params.value === "Rejected") statusClass = "status-rejected";
        else if (params.value === "Approved") statusClass = "status-approved";

        return `<span class="status-badge ${statusClass}">${params.value}</span>`;
    }
},
        { 
            headerName: "Action", 
            field: "action",
            pinned:"right",
            resizable:true,
            width:90,
            cellStyle: { display: "flex", alignItems: "center" },
            cellRenderer: function() {
                return `<button class="edit-btn"> Edit</button>`;
            }
        }
    ];
const rowData = [
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Maharashtra", city: "Pune", districtcode: "MH.PU",district:"Pune",tehsil:"Haveli",pincode:"411045", areaCodeStatus: "Approved" },
        { country: "India", zone: "W2", subZone: "Loreal", ro: "Loreal", state: "Gujarat", city: "Sabarkantha", districtcode: "GJ.RE", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Sent to Approval" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Karnataka", city: "Udupi", districtcode: "KA.LP", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Rejected" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Tamil Nadu", city: "Coimbatore", districtcode: "TN.YU", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Sent to Approval" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Maharashtra", city: "Pune", districtcode: "MH.PU",district:"Pune",tehsil:"Haveli",pincode:"411045", areaCodeStatus: "Approved" },
        { country: "India", zone: "W2", subZone: "Loreal", ro: "Loreal", state: "Gujarat", city: "Sabarkantha", districtcode: "GJ.RE", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Approved" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Karnataka", city: "Udupi", districtcode: "KA.LP", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Rejected" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Tamil Nadu", city: "Coimbatore", districtcode: "TN.YU", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Sent to Approval" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Maharashtra", city: "Pune", districtcode: "MH.PU",district:"Pune",tehsil:"Haveli",pincode:"411045", areaCodeStatus: "Sent to Approval" },
        { country: "India", zone: "W2", subZone: "Loreal", ro: "Loreal", state: "Gujarat", city: "Sabarkantha", districtcode: "GJ.RE", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Sent to Approval" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Karnataka", city: "Udupi", districtcode: "KA.LP", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Rejected" },
        { country: "India", zone: "W1", subZone: "Loreal", ro: "Loreal", state: "Tamil Nadu", city: "Coimbatore", districtcode: "TN.YU", district:"Pune",tehsil:"Haveli",pincode:"411045",areaCodeStatus: "Sent to Approval" },

    ];

           const gridOptions = {
        columnDefs: columnDefs,
        rowData: rowData,
        pagination: true,
        domLayout: 'autoHeight',
        paginationPageSize: 10,
        rowSelection:"multiple",
        rowHeight:60,
         onPaginationChanged: function () {
            updatePaginationText();
        }
    };
            const gridDiv = document.querySelector("#myGrid");
            console.log(gridDiv); // Debugging
            new agGrid.Grid(gridDiv, gridOptions);
            function updatePaginationText() {
        setTimeout(() => {
            const pageInfo = document.querySelector(".ag-paging-panel");
            if (pageInfo) {
                const currentPageSize = gridOptions.api.paginationGetPageSize();
                const currentPageIndex = gridOptions.api.paginationGetCurrentPage();
                const totalRows = gridOptions.api.paginationGetRowCount();
                const startRow = currentPageIndex * currentPageSize + 1;
                let endRow = (currentPageIndex + 1) * currentPageSize;
                if (endRow > totalRows) endRow = totalRows;

                const customText = `Showing ${endRow} data of ${totalRows} entries`;
                
                let customPaginationDiv = document.querySelector("#custom-pagination");
                if (!customPaginationDiv) {
                    customPaginationDiv = document.createElement("div");
                    customPaginationDiv.id = "custom-pagination";
                    customPaginationDiv.style.marginRight = "auto"; // Align to the left
                    pageInfo.prepend(customPaginationDiv);
                }
                customPaginationDiv.innerText = customText;
            }
        }, 100);
    }
        });
