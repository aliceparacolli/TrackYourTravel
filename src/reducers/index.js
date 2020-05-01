import {createStore, combineReducers} from 'redux'
import {dateReducer} from './date.reducers'

// combina tutti i reducer che sono stati creati dal programmatore
const rootReducer = combineReducers({
  date: dateReducer
})

// data la combinazione dei reducer crea uno store
export const store = createStore(rootReducer)