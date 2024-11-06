const pancakeTypeDropdown = document.getElementById("type");
const toppingCheckboxes = document.querySelectorAll(
  ".customization-section input[type='checkbox']"
);
const deliveryRadioButtons = document.querySelectorAll(
  "input[name='delivery']"
);
const seeOrderButton = document.getElementById("seeOrder");
const totalPriceDisplays = document.querySelectorAll("#totalPrice");

let orders = [];

function calculateTotalPrice() {
  let totalPrice = parseInt(pancakeTypeDropdown.value);

  toppingCheckboxes.forEach(function (topping) {
    if (topping.checked) {
      totalPrice += parseInt(topping.value);
    }
  });

  deliveryRadioButtons.forEach(function (option) {
    if (option.checked && option.value === "delivery") {
      totalPrice += 5;
    }
  });

  totalPriceDisplays.forEach(function (display) {
    display.textContent = `Price: $${totalPrice}`;
    display.classList.add("price-animation");
    setTimeout(function () {
      display.classList.remove("price-animation");
    }, 300);
  });

  return totalPrice;
}

function displayOrder() {
  const customerName =
    document.getElementById("customerName").value.trim() || "Guest";
  const selectedPancakeType =
    pancakeTypeDropdown.options[pancakeTypeDropdown.selectedIndex].text;
  const selectedToppings = Array.from(toppingCheckboxes)
    .filter(function (topping) {
      return topping.checked;
    })
    .map(function (topping) {
      return topping.nextSibling.textContent.trim();
    });
  const selectedDeliveryMethod =
    Array.from(deliveryRadioButtons)
      .find(function (option) {
        return option.checked;
      })
      ?.nextSibling.textContent.trim() || "Not Selected";
  const finalTotalPrice = calculateTotalPrice();

  const order = {
    customerName: customerName,
    pancakeType: selectedPancakeType,
    toppings: selectedToppings.length > 0 ? selectedToppings : ["None"],
    deliveryMethod: selectedDeliveryMethod,
    totalPrice: finalTotalPrice,
  };

  orders.push(order);

  alert(`
    Order Summary:
    Customer Name: ${order.customerName}
    Pancake Type: ${order.pancakeType}
    Toppings: ${order.toppings.join(", ")}
    Delivery Method: ${order.deliveryMethod}
    Total Price: $${order.totalPrice}
  `);
}

pancakeTypeDropdown.addEventListener("change", calculateTotalPrice);
toppingCheckboxes.forEach(function (topping) {
  topping.addEventListener("change", calculateTotalPrice);
});
deliveryRadioButtons.forEach(function (option) {
  option.addEventListener("change", calculateTotalPrice);
});
seeOrderButton.addEventListener("click", displayOrder);
