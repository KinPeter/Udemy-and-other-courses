import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
    ui: fromUI.UIState;
    auth: fromAuth.AuthState;
}

export const reducers: ActionReducerMap<State> = {
    ui: fromUI.uiReducer,
    auth: fromAuth.authReducer
};

export const getUiState = createFeatureSelector<fromUI.UIState>('ui');
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuthenticated);
