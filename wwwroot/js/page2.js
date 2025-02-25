const columns2 = ["Product", "Price", "Stock"];
const data2 = [
    { Product: "Laptop", Price: "$1000", Stock: "Available" },
    { Product: "Phone", Price: "$500", Stock: "Out of Stock" },
    { Product: "Headphones", Price: "$100", Stock: "Available" },
];

$(document).ready(() => {
    createTable(columns2, data2);
});
