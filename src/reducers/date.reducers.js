import moment from "moment"

export const dateActions = {
  CHANGE_DATE: "CHANGE_DATE"
}

const initialState = {
  day: moment().date(),
  month: moment().month()+1,
  year: moment().year()
}

// "Reducer" which receives the new date value from the dispatcher
// and it updates the status by re-rendering (at the expense of the "redux" library) all the components that request it
// using "useSelector"
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
