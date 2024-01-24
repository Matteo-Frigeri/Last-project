// Azione per aggiungere un elemento ai preferiti
export const ADD_FAVORITE = 'ADD_FAVORITE';
// Azione per rimuovere un elemento dai preferiti
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
// Funzione di aggiunta ai preferiti
export const addFavorite = (title) => {
  return {
    type: ADD_FAVORITE,
    payload: title,
  };
};
// Funzione di rimozione dai favoriti
export const removeFavorite = (title) => {
  return {
    type: REMOVE_FAVORITE,
    payload: title,
  };
};
