import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from '../features/auth'; 

const store = configureStore({
    reducer: {
        // [clothing.reducerPath]: clothing.reducer,
        auth: authReducer,
    },  
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(clothing.middleware),
});

// setupListeners(store.dispatch);

export default store;