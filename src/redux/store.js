import { configureStore } from '@reduxjs/toolkit'

import SearchSlice from './slices/SearchSlice';
import AuthSlice from './slices/AuthSlice';


const store = configureStore({
    reducer: {
        search: SearchSlice,
        auth: AuthSlice
    }
});

export default store;