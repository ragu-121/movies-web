import { configureStore } from "@reduxjs/toolkit";
import movieId_reducer from './slices/movieId_slice';

const store = configureStore({
    reducer: {
        movieId_reducer: movieId_reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

