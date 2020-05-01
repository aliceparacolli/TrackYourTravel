import database from './database.json'

export function getTrip({ variables }) {
  // dato un id cerca il viaggio con quell'id
  // - data: i dati del viaggio, se ci sono
  // - error: =true se non ci sono dati
  const data = database.find(({ id }) => id === variables.id) ?? null;
  const error = false;
  return { error, data }
}

export function getRecapByDate({ variables }) {
  // chiama la funzione tripMIddleware passandogli:
  //  - variables che contiene: id del viaggio, giorno, mese e anno
  //  - "recap" che indica che deve restituirmi ciò che è associato alla key "recap" in database.json
  return tripMiddleware(variables, "recap")
}


export function getQuestionByDate({ variables }) {
  // chiama la funzione tripMIddleware passandogli:
  //  - variables che contiene: id del viaggio, giorno, mese e anno
  //  - "question" che indica che deve restituirmi ciò che è associato alla key "question" in database.json
  return tripMiddleware(variables, "question")
}


export function getStasticsByDate({ variables }) {
  // chiama la funzione tripMIddleware passandogli:
  //  - variables che contiene: id del viaggio, giorno, mese e anno
  //  - "statistic" che indica che deve restituirmi ciò che è associato alla key "statistic" in database.json
  return tripMiddleware(variables, "statistic")
}


export function getAskByDate({ variables }) {
  // chiama la funzione tripMIddleware passandogli:
  //  - variables che contiene: id del viaggio, giorno, mese e anno
  //  - "asks" che indica che deve restituirmi ciò che è associato alla key "asks" in database.json
  return tripMiddleware(variables, "asks")
}


export function getEventsByDate({ variables }) {
  // chiama la funzione tripMIddleware passandogli:
  //  - variables che contiene: id del viaggio, giorno, mese e anno
  //  - "events" che indica che deve restituirmi ciò che è associato alla key "events" in database.json
  return tripMiddleware(variables, "events")
}


/*
Dato l'id del day questa query deve restituire:
- url della mappa
*/
export function getMapByDate({ variables }) {
  return tripMiddleware(variables, "map")
}


/*
Data una statistica per esempio "km" mi restituisce tutti i dati 
giornalieri di quella statistica di modo che possa visualizzare il 
grafico riepilogativo
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
  // cerca un viaggio per id
  // se trova quel viaggio con quell'id cerca un giorno per giorno,mese e anno
  // se trova quel giorno allora restituisce il valore associato a key
  // altrimenti error = true
  let data
  let error = true
  try {
    data = database.find(({ id }) => id === e.trip).tripDays.filter(
      ({ day, month, year }) => e.day === day && e.month === month && e.year === year)[0][key]
    error = false || data === undefined || data === null
  } catch { }

  return { error, data }
}