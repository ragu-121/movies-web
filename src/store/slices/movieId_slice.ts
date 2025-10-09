import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


interface MovieIdState {
    movieId: string;
}

const initialState: MovieIdState = {
    movieId: '155',
};

export const movieId_slice = createSlice({
    name: 'movieId',
    initialState,
    reducers: {
        setMovieId: (state, action: PayloadAction<string>) => {
            state.movieId = action.payload;
        }
    }
})

export const { setMovieId } = movieId_slice.actions;
export default movieId_slice.reducer;

// Selector (read state)
export const selectMovieId = (state: RootState) => state.movieId_reducer.movieId;