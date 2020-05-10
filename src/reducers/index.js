import {createStore, combineReducers} from 'redux'
import {dateReducer} from './date.reducers'

// it combines all the "reducers" that have been created by the programmer
const rootReducer = combineReducers({
  date: dateReducer
})

// given the combination of "reducers" it creates a store
export const store = createStore(rootReducer)
