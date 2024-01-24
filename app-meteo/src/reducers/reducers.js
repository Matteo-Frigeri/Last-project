/*initialState rappresenta lo stato iniziale dell'applicazione per il modulo meteorologico,
con weatherData inizializzato a null.*/
const initialState = {
    weatherData: null,
  };
/*weatherReducer è una funzione che accetta lo stato corrente e un'azione, e restituisce un
nuovo stato in base all'azione ricevuta.
Nel caso dell'azione 'SET_WEATHER_DATA', il reducer restituisce un nuovo stato clonando lo 
stato corrente (...state) e aggiornando il campo weatherData con i dati forniti nell'azione 
(action.payload). */
  const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_WEATHER_DATA':
        return { ...state, weatherData: action.payload };
      default:
        return state;
    }
  };
  
  export default weatherReducer;