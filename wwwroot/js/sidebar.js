document.querySelectorAll('.menu li').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.menu li').forEach(li => li.classList.remove('active'));
        item.classList.add('active');
    });
});
    console.log("DOM y loaded");
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");

    // Attach event listener to the parent container (event delegation)
    document.getElementById("sidebar").addEventListener("click", function (event) {
        console.log("sdd")
        const target = event.target.closest(".menu-link"); // Ensure click is on a menu item
        console.log("target",target)
        if (target) {
            event.preventDefault(); // Prevent default anchor behavior

            const page = target.getAttribute("data-page");
            console.log("Page to load:", page); // Now you should see logs
            
            loadComponent(`./pages/${page}`, "content"); // Load the selected page
            
            // Remove 'active' class from all menu items and add to clicked one
            document.querySelectorAll(".menu-link").forEach(item => item.classList.remove("active"));
            target.classList.add("active");
        }
    });
});

