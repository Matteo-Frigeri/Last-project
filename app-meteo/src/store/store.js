import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../reducers/reducers';
/*Viene utilizzato configureStore dal pacchetto @reduxjs/toolkit per creare lo store.
Nello store viene specificato weatherReducer come il reducer responsabile di gestire 
lo stato meteorologico. */
const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});

export default store;