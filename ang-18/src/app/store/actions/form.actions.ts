import { FormData } from "../../models/form.model";
import { createAction, props } from "@ngrx/store";

export const submitForm =  createAction('[Form] Submit Form');

export const submitFormSuccess = createAction('[Form] Submit Form Success', props<{formData: any}>());

export const submitFormFailure = createAction('[Form] Submit Form Failure', props<{ error: any}>());
