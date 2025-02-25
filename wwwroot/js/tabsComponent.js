function createTabs(tabs) {
    $("#tabs-container").empty(); // Clear previous tabs

    let tabsHtml = `<div class="tabs">`;
    let contentHtml = ``;

    tabs.forEach((tab, index) => {
        let activeClass = index === 0 ? "active" : "";
        tabsHtml += `<div class="tab ${activeClass}" data-tab="tab-${index}">${tab.name}</div>`;
        contentHtml += `<div class="tab-content ${activeClass}" id="tab-${index}">${tab.content}</div>`;
    });

    tabsHtml += `</div>`;
    $("#tabs-container").append(tabsHtml + contentHtml);

    // Tab Click Event
    $(".tab").click(function () {
        let tabId = $(this).data("tab");

        $(".tab").removeClass("active");
        $(".tab-content").removeClass("active");

        $(this).addClass("active");
        $("#" + tabId).addClass("active");
    });
}
