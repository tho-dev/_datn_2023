import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoading: true,
    document: {},
    documentView: "",
    status: false
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
        },
        createDocumentView: (state, action: PayloadAction<any>) => {
            state.documentView = action.payload
        },
        changeStatus: (state, action: PayloadAction<any>) => {
            state.status = action.payload
        }

    },
    initialState: initialState,
});
export default scanSlice.reducer;
export const { openModal, closeModal, createDocument, createDocumentView, changeStatus } = scanSlice.actions;
