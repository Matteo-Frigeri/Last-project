//Azioni importate
import { ADD_FAVORITE, REMOVE_FAVORITE } from "../actions/favoriteActions"
// Stato iniziale vuoto 
const initialState = {
    list: []
}

const favoritesReducers = (state = initialState, action) => {
//definisce lo stato iniziale a vuoto e gestisce come lo stato evolve in risposta alle azioni.
    switch (action.type) {
        //Aggiunge all'arry
        case ADD_FAVORITE:
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        //Rimuove dal'array
        case REMOVE_FAVORITE:
            return {
                ...state,
                list: state.list.filter((fav) => fav !== action.payload)
            }

        default:
            return state

    }
}


export default favoritesReducers;