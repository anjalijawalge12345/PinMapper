const columns1 = ["ID", "Name", "Age"];
const data1 = [
    { ID: 1, Name: "John Doe", Age: 25 },
    { ID: 2, Name: "Alice Smith", Age: 30 },
    { ID: 3, Name: "Bob Johnson", Age: 22 },
];

$(document).ready(() => {
    createTable(columns1, data1);
});
