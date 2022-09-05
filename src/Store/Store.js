import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from '../Services/cryptoApi';

const store = configureStore({
    reducer :{
        [cryptoApi.reducerPath]:cryptoApi.reducer
    }
})

export default store;