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

function isWeekend(weekday) {
  return weekday === "Saturday" || weekday === "Sunday";
}

export function getDeliveryDate(deliveryOption) {
  let daysToDeliver = deliveryOption.deliveryDays;
  let deliveryDays = 0;
  let deliveryDate = "";
  let weekday = "";
  const date = dayjs();

  while (daysToDeliver > 0) {
    weekday = date.add(deliveryDays, "days");
    weekday = weekday.format("dddd");
    deliveryDays += 1;

    if (isWeekend(weekday)) {
      continue;
    } else {
      daysToDeliver -= 1;
    }
  }

  deliveryDate = date.add(deliveryDays, "days");
  return deliveryDate.format("dddd, MMMM D");
}
