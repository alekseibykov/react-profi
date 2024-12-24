import { createSlice } from '@reduxjs/toolkit'
import {EventState} from "./types";

const initialState: EventState = {
    events: [],
    guests: []
}

const eventSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setEvents(state, action) {
            state.events = action.payload
        },
    }
})

// `createSlice` automatically generated action creators with these names.
// export them as named exports from this "slice" file
export const { setEvents } = eventSlice.actions

// Export the slice reducer as the default export
export default eventSlice.reducer