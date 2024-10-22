import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { replaceCounter } from '~/utils/fc';

const initialState = {
    isLoading: true,
    document: {},
    documentView: {
        numberFile: 0,
        minimumDigits: 0,
        nameFile: "",
        fullName: "",
    },
    status: false,
    box: {
        id: null,
        name: "",
        year: null,
    }
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
        createBox: (state, action: PayloadAction<any>) => {
            state.box = action.payload
        },
        changeStatus: (state, action: PayloadAction<any>) => {
            state.status = action.payload
        },
        changeNumberFile: (state, action: PayloadAction<any>) => {
            state.documentView = {
                ...state.documentView,
                numberFile: action.payload,
                fullName: replaceCounter(state.documentView.nameFile, action.payload, state.documentView.minimumDigits)
            }
        },
        changeNameFile: (state, action: PayloadAction<any>) => {
            state.documentView = {
                ...state.documentView,
                nameFile: action.payload,
                fullName: replaceCounter(action.payload, state.documentView.numberFile, state.documentView.minimumDigits)
            }
        },
        changeMinimumDigits: (state, action: PayloadAction<any>) => {
            state.documentView = {
                ...state.documentView,
                minimumDigits: action.payload,
                fullName: replaceCounter(state.documentView.nameFile, state.documentView.numberFile, action.payload)
            }
        },
        countNumberFile: (state) => {
            if (state.documentView?.numberFile) {
                state.documentView = {
                    ...state.documentView,
                    numberFile: state.documentView.numberFile + 1,
                    fullName: replaceCounter(state.documentView.nameFile, state.documentView.numberFile + 1, state.documentView.minimumDigits)
                }
            }
        },
        countNumberFileReduce: (state) => {
            if (state.documentView?.numberFile) {
                state.documentView = {
                    ...state.documentView,
                    numberFile: state.documentView.numberFile == 1 ? 1 : state.documentView.numberFile - 1,
                    fullName: replaceCounter(state.documentView.nameFile, state.documentView.numberFile - 1, state.documentView.minimumDigits)
                }
            }
        },

    },
    initialState: initialState,
});
export default scanSlice.reducer;
export const { openModal, closeModal, createDocument, createDocumentView, changeStatus, changeNumberFile, countNumberFile, changeMinimumDigits, changeNameFile, createBox, countNumberFileReduce } = scanSlice.actions;
