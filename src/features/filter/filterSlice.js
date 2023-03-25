import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filter: [],
    searchTerm: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterInitialized: (state, action) => {
            const projects = action.payload;
            if (projects.length > 0)
                projects.map((project) =>
                    state.filter.includes(project.projectName)
                        ? null
                        : state.filter.push(project.projectName)
                );
        },
        filterAdded: (state, action) => {
            state.filter = [...state.filter, action.payload];
        },
        filterRemoved: (state, action) => {
            state.filter = state.filter.filter((el) => el !== action.payload);
        },
        searched: (state, action) => {
            state.searchTerm = action.payload;
        },
    },
});

export const { filterAdded, filterRemoved, searched, filterInitialized } =
    filterSlice.actions;
export default filterSlice.reducer;
