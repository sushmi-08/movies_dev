import { FormData } from "../../../models/form.model";
import { createReducer, on } from "@ngrx/store";
import { submitForm, submitFormSuccess, submitFormFailure } from "../form.actions";

export interface FormState {
    formData:  FormData | null;
    error: string | null;
    submitting: boolean;
}

export const initialState: FormState = {
    formData: null,
    error: null,
    submitting: false
};

export const formReducer = createReducer(
    initialState,
    on(submitForm, state => ({
        ...state,
        submitting: true,
    })),
    on(submitFormSuccess, (state, {formData}) => ({
        ...state,
        formData,
        submitting: false,
    })),
    on(submitFormFailure, (state, { error }) => ({
        ...state,
        submitting: false,
        error
    }))

);