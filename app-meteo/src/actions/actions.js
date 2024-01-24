/*L'azione setWeatherData viene definita per aggiornare lo stato con i dati meteorologici. 
Essa ha un campo payload che conterrà i dati effettivi.
*/
export const setWeatherData = (data) => ({
    type: 'SET_WEATHER_DATA',
    payload: data,
  });