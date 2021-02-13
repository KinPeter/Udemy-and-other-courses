import { UIActions, START_LOADING, STOP_LOADING } from './ui.actions';

export interface UIState {
    isLoading: boolean;
}

const initialState: UIState = {
    isLoading: false,
};

export function uiReducer(state: UIState = initialState, action: UIActions): UIState {
    switch (action.type) {
        case START_LOADING:
            return {
                isLoading: true
            };
        case STOP_LOADING:
            return {
                isLoading: false
            };
        default:
            return state;
    }
}

export const getIsLoading = (state: UIState) => state.isLoading;
