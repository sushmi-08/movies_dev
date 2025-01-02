import { FormState } from "../reducers/form.reducers";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectFormState = createFeatureSelector<FormState>('form');

export const selectFormData = createSelector(
    selectFormState,
    (state: FormState) => { console.log(state, 'FormData'); return state?.formData }
);

export const selectSubmitting = createSelector(
    selectFormState,
    (state: FormState) => { console.log(state, 'Submit'); return state?.submitting }
);

export const selectFormError = createSelector(
    selectFormState,
    (state: FormState) => { console.log(state, 'Error'); return state?.error }
);