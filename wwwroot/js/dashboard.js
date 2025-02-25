
window.onload = function() {

    const pinChartEl = document.getElementById('pinChart');
    const workflowChartEl = document.getElementById('workflowChart');


    if (!pinChartEl || !workflowChartEl) {
        console.error("Canvas elements not found. Ensure IDs are correct and elements exist in the HTML.");
        return; 
    }

    const pinCtx = pinChartEl.getContext('2d');
    const workflowCtx = workflowChartEl.getContext('2d');

    new Chart(pinCtx, {
        type: 'doughnut',
        data: {
            labels: ["No Change", "New", "Modified", "Deleted"],
            datasets: [{
                data: [1540, 700, 1000, 500],
                backgroundColor: ["#333335", "#E0F049", "#CAB5FC", "#009FFD"],
                borderWidth: 0 ,
                   borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
                plugins: {
                    legend: {
                        position: "right",
                        align: "center",
                        labels: {
                        padding:20,
                        boxWidth:20,
                         generateLabels: function(chart) {
                            const dataset = chart.data.datasets[0];
                            return chart.data.labels.map((label, i) => ({
                                text: `${label} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${dataset.data[i]}`,
                                fillStyle: dataset.backgroundColor[i],
                                strokeStyle: dataset.backgroundColor[i],
                                hidden: isNaN(dataset.data[i]),
                                lineWidth: 1,
                            }));
                        }
                        }
                    }
                },
                layout: {
            // padding: {
            //     right: 50
            // }
        }
        }
    });

    new Chart(workflowCtx, {
        type: 'doughnut',
        data: {
            labels: ["Sent to Approval", "Approved", "Rejected"],
            datasets: [{
                data: [1000, 900, 100],
                backgroundColor: ["#D8A5FA", "#9ACD32", "#FF6347"],
                borderWidth: 0 ,
                   borderRadius: 5,
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: true,
                    position: 'right', 
                    labels: {
                        boxWidth: 20,
                          generateLabels: function(chart) {
                            const dataset = chart.data.datasets[0];
                            return chart.data.labels.map((label, i) => ({
                                text: `${label} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${dataset.data[i]}`,
                                fillStyle: dataset.backgroundColor[i],
                                strokeStyle: dataset.backgroundColor[i],
                                hidden: isNaN(dataset.data[i]),
                                lineWidth: 1,
                            }));
                        },
                        padding: 15 
                    }
                }
            }
        }
    });
};

// Initialize Map using Leaflet.js
document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([22.3511, 78.6677], 5); // Centered in India

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var locations = [
        { lat: 28.7041, lon: 77.1025, name: "Delhi" },
        { lat: 23.2599, lon: 77.4126, name: "Bhopal" },
        { lat: 22.5726, lon: 88.3639, name: "Kolkata" },
        { lat: 19.0760, lon: 72.8777, name: "Mumbai" },
        { lat: 13.0827, lon: 80.2707, name: "Chennai" }
    ];

    locations.forEach(location => {
        L.marker([location.lat, location.lon]).addTo(map)
            .bindPopup(`<b>${location.name}</b><br>Pin Code Changes`);
    });
});

function toggleDropdown() {
        const dropdown = document.querySelector('.dropdown-menu');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.dropdown-menu');
        const toggleBtn = document.querySelector('.dropdown-toggle');

        if (!toggleBtn.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = 'none';
        }
    });
