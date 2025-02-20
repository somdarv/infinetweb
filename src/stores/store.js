import {configureStore, ThunkAction, Action} from "@reduxjs/toolkit"
import { combineReducers } from "@reduxjs/toolkit"


const rootReducer = combineReducers({

})


export const store = configureStore({
    reducer: rootReducer
})