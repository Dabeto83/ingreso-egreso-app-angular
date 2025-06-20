import { Action, createReducer, on } from "@ngrx/store";
import * as userActions from './user.actions';
import { User } from "../models/user.model";

export interface State {
    user: User;
}

export const initialState: State = {
    user: {} as User,
}

const _userReducer = createReducer(initialState,
    on(userActions.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(userActions.unsetUser, state => ({ ...state, user: {} as User }))
);

export function userReducer(state: State | undefined, action: Action<string>) {
    return _userReducer(state, action);
}