const {
  kmToMiles,
  haversineDistanceInMiles,
  getPeopleInOrAroundLocation,
  ensureNumberIsValidOrDefault,
} = require("./utils");
const config = require("config");
const { Point } = require("../interfaces/point");

describe("kmToMiles function", () => {
  test("1km should equal 0.6 miles", () => {
    expect(kmToMiles(1)).toBeCloseTo(0.6, 1);
  });

  test("10km should equal 6.2 miles", () => {
    expect(kmToMiles(10)).toBeCloseTo(6.2, 1);
  });

  test("180.2km should equal 112 miles", () => {
    expect(kmToMiles(180.2)).toBeCloseTo(112, 1);
  });
});

describe("haversineDistanceInMiles function", () => {
  const londonConfigKey = "Locations.London";

  test("Expect the london configuration object conforms to the Point interface", () => {
    const london = config.get(londonConfigKey);
    expect(london).toHaveProperty("latitude");
    expect(london).toHaveProperty("longitude");
  });

  test("Expect that the function returns 0 ( zero ) for the same points passed", () => {
    const p1 = config.get(londonConfigKey);
    const p2 = p1;
    expect(haversineDistanceInMiles(p1, p2)).toBeCloseTo(0);
  });

  test("Expect it returns an error for an invalid point { latitude: 0, longitude: 0 }", () => {
    const p1 = config.get(londonConfigKey);
    const p2 = { latitude: 0, longitude: 0 };
    expect(() => haversineDistanceInMiles(p1, p2)).toThrow();
  });

  test("Expect it returns a distance of 201.4 for Blackpool", () => {
    const p1 = config.get(londonConfigKey);
    const p2 = { latitude: 53.81667, longitude: -3.05 };
    expect(haversineDistanceInMiles(p1, p2)).toBeCloseTo(201.4, 1);
  });

  test("Expect it returns 162.9 miles for London to Manchester", () => {
    const p1 = config.get(londonConfigKey);
    const p2 = { latitude: 53.48095, longitude: -2.23743 };
    expect(haversineDistanceInMiles(p1, p2)).toBeCloseTo(162.9, 1);
  });

  test("ensureNumberIsValidOrDefault returns 50 when passed as string", () => {
    expect(ensureNumberIsValidOrDefault("abc", 0, 100, 50)).toEqual(50);
  });

  test("ensureNumberIsValidOrDefault returns the 25 when passed a number less than the minimum", () => {
    expect(ensureNumberIsValidOrDefault(-1, 0, 100, 25)).toEqual(25);
  });

  test("ensureNumberIsValidOrDefault returns the 30 when passed a number greater than the maximum", () => {
    expect(ensureNumberIsValidOrDefault(10000, 0, 100, 30)).toEqual(30);
  });

  test("ensureNumberIsValidOrDefault returns the number passed when passed a valid number", () => {
    expect(ensureNumberIsValidOrDefault(40, 0, 100, 30)).toEqual(40);
  });
});
