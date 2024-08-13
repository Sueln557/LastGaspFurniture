let sum_item_total = 0;

function furnstore() {
    sum_item_total = 2 + 3;
    console.log(sum_item_total);

    // Redirect to invoice.html with the sum_item_total as a query parameter
    window.location.href = `invoice.html?total=${sum_item_total}`;
}
