import moment from "moment"

export const dateActions = {
  CHANGE_DATE: "CHANGE_DATE"
}

const initialState = {
  day: moment().date(),
  month: moment().month()+1,
  year: moment().year()
}

// Reducer che riceve il nuovo valore della data dal dispatcher
// e aggiorna lo stato facendo re-renderizzare (a carico della libreria redux) tutti i componenti che ne fanno richiesta
// usando useSelector
export function dateReducer(state = initialState, action){
  switch(action.type){
    case dateActions.CHANGE_DATE:
      //it extracts the payload
      let payload = action.payload
      //it updates the state
      return Object.assign({},Object.assign(state,payload))
    default:
      return state
  }
}