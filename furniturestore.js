const furniture = ["chair", "recliner", "table", "umbrella"];
const unitedstates = ["ME", "NH", "VT", "MA", "CT", "NY", "RI", "PA", "WV", "VA", "NC", "SC", "KY", "OH", "IN", "MD", "NJ", "DE", "WI", "MN", "IA", "IL", "KS", "TN", "FL", "AL", "GA", "MO", "ND", "SD", "NE", "CO", "UT", "AR", "MS", "LA", "WA", "OR", "CA", "ID", "MT", "WY", "NV", "UT", "AZ", "NM", "TX"]
const zone1_cost = 0.00;
const zone2_cost = 20.00;
const zone3_cost = 30.00;
const zone4_cost = 35.00;
const zone5_cost = 45.00;

const chair_cost = 25.50;
const recliner_cost = 37.75;
const table_cost = 49.95;
const umbrella_cost = 24.89;

const shoppingcart = [];
let item;
let qtyofitem;
let unitprice;
let price;
let state = null;

let sum_unitprice = 0;
let sum_item_total = 0;
let sum_shipping_to = 0;
let sum_subtotal = 0;
let sum_tax = 0;

let sum_invoice_total = 0;

// hoisted to call the other functions
function furnstore() {
      shopper_buy();
      calculations();
      item_total();
      display_output();

      // Update HTML elements with calculated values
      document.getElementById('btstate').textContent = `Shipping to: ${state}`;
      document.getElementById('btsum_item_total').innerHTML = '$' + sum_item_total.toFixed(2);
      document.getElementById('btsum_shipping_to').innerHTML = '$' + sum_shipping_to.toFixed(2);
      document.getElementById('btsum_subtotal').innerHTML = '$' + sum_subtotal.toFixed(2);
      document.getElementById('btsum_tax').innerHTML = '$' + sum_tax.toFixed(2);
      document.getElementById('btsum_invoice_total').innerHTML = '$' + sum_invoice_total.toFixed(2);

      // console.log("sum_item_total in furnstore() = ", sum_item_total);
      // console.log("sum_shipping_to in furnstore() = ", sum_shipping_to);
      // console.log("sum_subtotal in furnstore() = ", sum_subtotal);
      // console.log("sum_tax in furnstore() = ", sum_tax);
      // console.log("sum_invoice_total in furnstore() = ", sum_invoice_total);

}

// user's input shopping cart
function shopper_buy() {
      let contshop = 'y';

      while (contshop.toLowerCase() === 'y') {
            item = prompt('What item would like to buy today:  Chair, Recliner, Table or Umbrella?');

            if (!furniture.includes(item.toLowerCase())) {
                  alert("Item not available.")
                  continue;
            }

            let validQuantity = false;

            while (!validQuantity) {
                  let userInput = prompt('How many ' + item + ' would you like to buy?');
                  qtyofitem = parseInt(userInput, 10);
                  if (isNaN(qtyofitem) || qtyofitem < 0 || userInput.trim() === '') {
                        alert("You cannot buy negative items or enter non-numeric values. Please enter a valid quantity.");
                  } else {
                        validQuantity = true;
                  }
            }

            unitprice = unit_price();

            price = qtyofitem * unitprice;

            contshop = prompt('Continue shopping? y/n');
            if (contshop.toLowerCase() === 'n') {

            } else if (contshop.toLowerCase() === 'y') {

            } else {
                  alert('Invalid input. Please enter "y" to continue or "n" to stop.');
                  break;
            }

            let thing = {
                  item: item,
                  quantity: qtyofitem,
                  unit_price: unitprice,
                  price: price
            };

            shoppingcart.push(thing);
      }
      state = prompt('Please enter the two letter state abbreviation');
      state = state.toUpperCase();

      while (!unitedstates.includes(state.toUpperCase())) {
            alert("Invalid State");
            state = prompt('Please enter the two letter state abbreviation');
            state = state.toUpperCase();
      }

      //console.log(shoppingcart);
}

// inventory and price table
function unit_price() {
      if (item.toLowerCase() === 'chair') {
            return chair_cost;
      } else if (item.toLowerCase() === 'recliner') {
            return recliner_cost;
      } else if (item.toLowerCase() === 'table') {
            return table_cost;
      } else if (item.toLowerCase() === 'umbrella') {
            return umbrella_cost;
      }
}

// calculate Item total:, Shipping to [state abbr], Subtotal, Tax, Invoice Total
function calculations() {

      sum_item_total = item_total();
      if (sum_item_total <= 100)  //Orders over $100 qualify for free shipping
            sum_shipping_to = shipping_to();
      else
            sum_shipping_to = 0;
      sum_subtotal = sum_shipping_to + sum_item_total;
      sum_tax = tax(sum_subtotal);
      sum_tax = Math.round(sum_tax * 100) / 100;  //console.log vs getElementBy displays differently
      sum_invoice_total = sum_subtotal + sum_tax;

}

// calculate Item Total: field
function item_total() {
      let sum_unitprice = 0;
      let index = 0;

      for (index = 0; index < shoppingcart.length; index++) {
            price = shoppingcart[index].quantity * shoppingcart[index].unit_price;
            sum_unitprice = price + sum_unitprice;
      }
      return sum_unitprice;

}

// determine shipping cost according to zone
// https://www.bls.gov/respondents/mwr/electronic-data-interchange/appendix-d-usps-state-abbreviations-and-fips-codes.htm
function shipping_to() {
      switch (state.toUpperCase()) {
            case 'ME':
            case 'NH':
            case 'VT':
            case 'CT':
            case 'NY':
            case 'RI':
            case 'MA':
                  shipping_cost = zone1_cost;
                  break;
            case 'PA':
            case 'WV':
            case 'VA':
            case 'NC':
            case 'SC':
            case 'KY':
            case 'OH':
            case 'IN':
            case 'MD':
            case 'NJ':
            case 'DE':
                  shipping_cost = zone2_cost;
                  break;
            case 'WI':
            case 'MN':
            case 'IA':
            case 'IL':
            case 'KS':
            case 'TN':
            case 'FL':
            case 'AL':
            case 'GA':
            case 'MO':
                  shipping_cost = zone3_cost;
                  break;
            case 'ND':
            case 'SD':
            case 'NE':
            case 'CO':
            case 'UT':
            case 'AR':
            case 'MS':
            case 'LA':
                  shipping_cost = zone4_cost;
                  break;
            case 'WA':
            case 'OR':
            case 'CA':
            case 'ID':
            case 'MT':
            case 'WY':
            case 'NV':
            case 'UT':
            case 'AZ':
            case 'NM':
            case 'TX':
                  shipping_cost = zone5_cost;
                  break;
            default:
                  alert("Your shipping state is too far!  We will drone it to you.");
                  break;
      }
      return shipping_cost;
}

// calculate Tax: field
function tax(subtotal) {
      let tax = 0;

      tax = subtotal * 0.15;
      return tax;
}

// display shopping cart for #top-container
function display_output() {
      console.log("Item\tQuantity\tUnit Price\tPrice\n");
      for (index = 0; index < shoppingcart.length; index++) {
            price = shoppingcart[index].quantity * shoppingcart[index].unit_price;
            sum_unitprice = price + sum_unitprice;
            console.log(shoppingcart[index].item + "\t" + shoppingcart[index].quantity + "\t" + shoppingcart[index].unit_price + "\t" + price);
      }

}

document.addEventListener("DOMContentLoaded", function() {
      document.getElementById("shopagain").addEventListener("click", function() { location.href = 'index.html'; });
});