import { Point } from "../interfaces/point";
const axios = require("axios");
const haversine = require("haversine-distance");
const config = require("config");

const M_TO_KM = 1000; /** How many meters are there in a km*/
const KM_TO_MILES = 0.6214; /** How many km are there per mile */
const DEFAULT_RADIUS_IN_MILES = 50; /** A sensible radius in miles from a location */
const MAX_RADIUS_IN_MILES = 50;

/**
 * This function takes a numeric value for km and will return the approx value in miles
 * @param km : number -
 * @returns number
 */
export const kmToMiles = (km: number) => {
  return km * KM_TO_MILES;
};

/**
 * This is a wrapper function that simply returns the value in miles ( by default its m )
 * @param pointOne : Point
 * @param pointTwo : Point
 * @returns number
 */
export const haversineDistanceInMiles = (
  pointOne: Point,
  pointTwo: Point
): number => {
  const distance = haversine(pointOne, pointTwo);

  if (isNaN(distance))
    throw Error(`Distance received an invalid point ${pointOne}|${pointTwo}`);

  return kmToMiles(distance / M_TO_KM);
};

/**
 * This function will check to make sure a value passed is numeric and in range, if it is not it
 * returns the defaultValue specified
 *
 * @param valueToTest: number
 * @param minValue: number
 * @param maxValue: number
 * @param defaultValue: number
 * @returns Returns the number if its valid or the defaultValue if its not
 */
export const ensureNumberIsValidOrDefault = (
  valueToTest: number,
  minValue: number,
  maxValue: number,
  defaultValue: number
): number => {
  let returnValue = defaultValue;

  if (!isNaN(valueToTest)) {
    if (valueToTest < minValue || valueToTest > maxValue)
      returnValue = defaultValue;
    else returnValue = valueToTest;
  }
  return returnValue;
};

/**
 * This method will run make API calls to retrieve records that match the location and are within the radius of that location.
 * If an unknown location is passed then only records that match that location are returned and not within the radius of that location
 * @param argLocation: number
 * @param argRadiusInMiles
 * @returns Array<any>
 */
export const getPeopleInOrAroundLocation = async (
  argLocation: string,
  argRadiusInMiles: number
) => {
  const baseUrl = config.get("UpstreamApi.baseUrl");
  const location = argLocation;
  const radius = ensureNumberIsValidOrDefault(
    argRadiusInMiles,
    0,
    MAX_RADIUS_IN_MILES,
    DEFAULT_RADIUS_IN_MILES
  );

  try {
    const forcedRecordsToReturn: Array<number> = [];
    const peopleInNamedLocation = await axios.get(
      `${baseUrl}/city/${location}/users`
    );

    const knownLocationRequested = config.has(`Locations.${location}`);
    if (!knownLocationRequested) return peopleInNamedLocation.data;

    peopleInNamedLocation.data.forEach((e: any) =>
      forcedRecordsToReturn.push(e.id)
    );

    const loctionCoordinates = config.get(`Locations.${location}`);
    const allPeople = await axios.get(`${baseUrl}/users`);
    const matchingRecords: Array<any> = allPeople.data.filter((e: any) => {
      return (
        forcedRecordsToReturn.includes(e.id) ||
        haversineDistanceInMiles(loctionCoordinates, {
          longitude: e.longitude,
          latitude: e.latitude,
        }) <= radius
      );
    });

    return matchingRecords;
  } catch (error) {
    throw "An error occured calling the API";
  }
};
