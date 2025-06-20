import { ActionReducerMap } from "@ngrx/store";
import * as ui from './shared/ui.reducers';
import * as user from './auth/user.reducer';

export interface AppState {
    ui: ui.State,
    user: user.State
}

export const appReducers: ActionReducerMap<AppState> = {
    ui: ui.uiReducer,
    user: user.userReducer
}