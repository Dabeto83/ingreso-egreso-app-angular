import { Action, createReducer, on } from "@ngrx/store"
import * as uiActions from "./ui.actions"


export interface State {
    isLoading: boolean;
}
export const initialState: State = {
    isLoading: false,
}

const _uiReducer = createReducer(initialState,
    on(uiActions.isLoading, state => ({ ...state, isLoading: true })),
    on(uiActions.stopLoading, state => ({ ...state, isLoading: false }))
)

export function uiReducer(state: State | undefined, action: Action<string>) {
    return _uiReducer(state, action);
}
