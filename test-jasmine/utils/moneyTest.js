import formatCurrency from "../../scripts/utils/money.js";

describe("test suite: formartCurrency", () => {
  it("converts cents into dollar", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });

  it("rounds up to the nearest cent", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
    expect(formatCurrency(2000.4)).toEqual("20.00");
  });

  it("works with negative currency value", () => {
    expect(formatCurrency(-100)).toEqual("-1.00");
  });
});
