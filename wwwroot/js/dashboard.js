function createDoughnutChart(svgId, legendId, data, labels, colors) {
    const width = 220, height = 220, radius = Math.min(width, height) / 2;

    // Tooltip
    const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background", "#fff")
        .style("padding", "5px 10px")
        .style("border-radius", "5px")
        .style("border", "1px solid #ccc")
        .style("box-shadow", "2px 2px 10px rgba(0,0,0,0.1)")
        .style("pointer-events", "none")
        .style("display", "none");

    const svg = d3.select(svgId)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Ensure pie values are correctly linked to data indexes
    const pie = d3.pie().value((d, i) => data[i])(data);
    const arc = d3.arc().innerRadius(50).outerRadius(radius - 8).cornerRadius(8);

    svg.selectAll("path")
        .data(pie)
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d, i) => colors[i])
        .on("mouseover", function (event, d) {
            // Ensure correct label-value pairing
            const index = data.indexOf(d.data); // Get correct index from data array
            tooltip.style("display", "block")
                .html(`<strong style="color:${colors[index]}">${labels[index]}</strong><br>${d.data}`);
        })
        .on("mousemove", function (event) {
            tooltip.style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px");
        })
        .on("mouseout", function () {
            tooltip.style("display", "none");
        });

    // Create legends with row flex
    const legend = d3.select(legendId);
    legend.selectAll("*").remove(); // Clear previous legends

    const totalValue = data.reduce((sum, value) => sum + value, 0); // Calculate total sum

    // Append total value above the legend items
    legend.append("div")
        .attr("class", "total-value")
        .style("font-weight", "bold")
        .style("color", "#333")
        .style("margin-bottom", "16px")
        .style("font-size", "32px")
        .style("display","flex")
        .style("align-items","center")
        .style("gap","10px")
        .html(`${totalValue} <span style="color: #929292; font-size: 16px; font-weight: 600;">Total</span>`);

    const legendContainer = legend.append("div").attr("class", "legend-container")
        .style("display", "flex")
        .style("flex-direction", "column")
        .style("gap", "5px");

    pie.forEach((d, i) => {
        const row = legendContainer.append("div").attr("class", "legend-row")
            .style("display", "flex")
            .style("align-items", "center")
            .style("justify-content", "space-between")
            .style("gap", "12px")
            .style("width", "100%");

        const legendItem = row.append("div").attr("class", "legend-item")
            .style("display", "flex")
            .style("align-items", "center")
            .style("gap", "8px");

        legendItem.append("div")
            .attr("class", "legend-box")
            .style("width", "22px")
            .style("height", "12px")
            .style("border-radius", "20px")
            .style("background-color", colors[i]);

        legendItem.append("span")
            .style("color", "#767676")
            .style("font-weight", "600")
            .text(labels[i]);

        // Value in the same row
        row.append("span")
            .style("color", "#404040")
            .style("font-weight", "700")
            .style("text-align", "left")
            .style("text-decoration", "underline")
            .text(data[i]);
    });
}

// Sample Data for PIN Code Statistics
const pinData = [15400, 100, 3000, 500];
const pinLabels = ["No Change", "New", "Modified", "Deleted"];
const pinColors = ["#333335", "#E0F049", "#CAB5FC", "#009FFD"];

// Sample Data for Workflow Summary
const workflowData = [1000, 900, 100];
const workflowLabels = ["Sent to Approval", "Approved", "Rejected"];
const workflowColors = ["#CAB5FC", "#E0F049", "#ED6A5A"];

// Create Charts
createDoughnutChart("#pinChart", "#pinLegend", pinData, pinLabels, pinColors);
createDoughnutChart("#workflowChart", "#workflowLegend", workflowData, workflowLabels, workflowColors);
