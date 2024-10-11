import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    document: {},
};

const scanSlice = createSlice({
    name: 'scan',
    reducers: {
        openModal(state) {
            state.isLoading = true;
        },
        closeModal(state) {
            state.isLoading = false;
        },
        createDocument: (state, action: PayloadAction<any>) => {
            state.document = { ...action.payload }
        }

    },
    initialState: initialState,
});
export default scanSlice.reducer;
export const { openModal, closeModal, createDocument } = scanSlice.actions;
