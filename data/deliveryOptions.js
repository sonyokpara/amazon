import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}

function isWeekend(date) {
  return date.format("dddd") === "Saturday" || date.format("dddd") === "Sunday";
}

export function deliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDays = 0;
  const date = dayjs();

  while (remainingDays > 0) {
    deliveryDays += 1;
    if (isWeekend(date)) {
      continue;
    }
    remainingDays -= 1;
  }
  const dueDate = date.add(deliveryDays, "days");
  return dueDate.format("dddd, MMMM D");
}
