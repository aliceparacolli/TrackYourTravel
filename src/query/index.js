import database from './database.json'

export function getTrip({ variables }) {
  // given an id it look for a travel with that specific id
  // - data: travel's data, if there are any
  // - error: =true if there aren0t any data
  const data = database.find(({ id }) => id === variables.id) ?? null;
  const error = false;
  return { error, data }
}

export function getRecapByDate({ variables }) {
  // It calls the function tripMIddleware and it gives to it:
  //  - variables that contains: travel id, day, month and year
  //  - "recap" indicates that it has to retun everything that is associated to the key "recap" in database.json
  return tripMiddleware(variables, "recap")
}


export function getQuestionByDate({ variables }) {
  //  It calls the function tripMIddleware and it gives to it:
  //  - variables that contains: id of the travel, day , month and year
  //  - "question" indicates that it has to retun everything that is associated to the key "question" in database.json
  return tripMiddleware(variables, "question")
}


export function getStasticsByDate({ variables }) {
  // It calls the function tripMIddleware and it gives to it:
  //  - variables that contains: id of the travel, day , month and year
  //  - "statistic" indicates that it has to retun everything that is associated to the key  "statistic" in database.json
  return tripMiddleware(variables, "statistic")
}


export function getAskByDate({ variables }) {
  // It calls the function tripMIddleware and it gives to it:
  //  - variables that contains: id of the travel, day , month and year
  //  - "asks" indicates that it has to retun everything that is associated to the key "asks" in database.json
  return tripMiddleware(variables, "asks")
}


export function getEventsByDate({ variables }) {
  // It calls the function tripMIddleware and it gives to it:
  //  - variables that contains: id of the travel, day , month and year
  //  - "events" indicates that it has to retun everything that is associated to the key  "events" in database.json
  return tripMiddleware(variables, "events")
}


/*
given the id of day this query must return:
- url of the map
*/
export function getMapByDate({ variables }) {
  return tripMiddleware(variables, "map")
}


/*
Given a statistic for example "km"it returns all the daily data  
of that statistic so that it can show the
summary chart
*/
export function getStatisticsByKey({ variables }, key) {
  let data;
  const error = false;
  try {
    data = database.find(({ id }) => id === variables.trip).tripDays.map(e => ({
      day: e.day,
      month: e.month,
      year: e.year,
      stat: e.statistic.statistic.find(e => e.name === key).day
    })) ?? null
  } catch { }
  return { data, error }
}

function tripMiddleware(e, key) {
  // It looks for a travel on its id
  // If it finds a travel with that id it look for a day following day, month and year
  // If it finds that day then it returns the value associated to key 
  // otherwise error = true
  let data
  let error = true
  try {
    data = database.find(({ id }) => id === e.trip).tripDays.filter(
      ({ day, month, year }) => e.day === day && e.month === month && e.year === year)[0][key]
    error = false || data === undefined || data === null
  } catch { }

  return { error, data }
}
