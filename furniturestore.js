const furniture = ["chair", "recliner", "table", "umbrella"];
const shoppingcart = [];
let item;
let qtyofitem;
let unitprice;

let sum_unitprice = 0;
let sum_item_total = 0;
let sum_shipping_to = 0;
let sum_subtotal = 0;
let sum_tax = 0;

let sum_invoice_total = 0;

// to call the other functions
function furnstore() {
      shopper_buy();
      calculations();
      item_total();
      display_output();

      //my debug code
      //console.log("sum_item_total in furnstore() = ", sum_item_total);
      //console.log("sum_shipping_to in furnstore() = ", sum_shipping_to);
      //console.log("sum_subtotal in furnstore() = ", sum_subtotal);
      //console.log("sum_tax in furnstore() = ", sum_tax);
      //console.log("sum_invoice_total in furnstore() = ", sum_invoice_total);

}

// user's shopping cart
function shopper_buy() {
      let contshop = 'y';

      while (contshop.toLowerCase() === 'y') {
            item = prompt('What item would like to buy today:  Chair, Recliner, Table or Umbrella?');

            if (!furniture.includes(item.toLowerCase())) {
                  alert("Item not available.")
                  continue;
            }

            qtyofitem = prompt('How many ' + item + ' would you like to buy?');
            if (qtyofitem < 0) {
                  alert("You cannot buy negative items.")
                  break;
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
                  unit_price: unitprice
            };

            shoppingcart.push(thing);
      }
      state = prompt('Please enter the two letter state abbreviation');

      //console.log(shoppingcart);
}

// inventory and price table
function unit_price() {
      if (item.toLowerCase() === 'chair') {
            return 25.50;
      } else if (item.toLowerCase() === 'recliner') {
            return 37.75;
      } else if (item.toLowerCase() === 'table') {
            return 49.95;
      } else if (item.toLowerCase() === 'umbrella') {
            return 24.89;
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
            case 'OR':
            case 'WA':
                  zone = 1;
                  shipping_cost = 0;
                  break;
            case 'OR':
            case 'ID':
            case 'CA':
            case 'MT':
            case 'NV':
                  zone = 2;
                  shipping_cost = 20;
                  break;
            case 'AZ':
            case 'ID':
            case 'UT':
            case 'MT':
            case 'CO':
                  zone = 3;
                  shipping_cost = 30;
                  break;
            case 'AZ':
            case 'NM':
            case 'TX':
            case 'CO':
            case 'UT':
                  zone = 4;
                  shipping_cost = 35;
                  break;
            case 'AL':
            case 'FL':
            case 'GA':
            case 'LA':
            case 'MS':
            case 'SC':
                  zone = 5;
                  shipping_cost = 45;
                  break;
            default:
                  alert("Your shipping state is too far!");
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

// display shopping cart for #top-container and debugging purposes
function display_output() {
      //console.log("Item\tQuantity\tUnit Price\tPrice\n");
      for (index = 0; index < shoppingcart.length; index++) {
            price = shoppingcart[index].quantity * shoppingcart[index].unit_price;
            sum_unitprice = price + sum_unitprice;
            //console.log(shoppingcart[index].item + "\t" + shoppingcart[index].quantity + "\t" + shoppingcart[index].unit_price + "\t" + price);
      }
}
