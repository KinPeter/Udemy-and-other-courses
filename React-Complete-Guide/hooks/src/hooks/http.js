import { useReducer, useCallback } from 'react';

const httpReducer = (currentHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null, data: null, extra: null, identifier: action.identifier };
        case 'RESPONSE':
            return { ...currentHttpState, loading: false, data: action.responseData, extra: action.extra };
        case 'ERROR':
            return { loading: false, error: action.errorData };
        case 'CLEAR':
            return { ...currentHttpState, error: null };
        default:
            throw new Error('Should not get there.');
    }
};

const useHttp = () => {
    const [httpState, dispatchHttpAction] = useReducer(httpReducer, { 
        loading: false, 
        error: null, 
        data: null,
        extra: null,
        identifier: null
    });

    const sendRequest = useCallback(async (url, method, body, requestExtra, requestIdentifier) => {
        dispatchHttpAction({type: 'SEND', identifier: requestIdentifier});
        try {
            const response = await fetch(url, { 
                method: method, 
                body: body,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            dispatchHttpAction({ type: 'RESPONSE', responseData: data, extra: requestExtra });
        } catch (error) {
            dispatchHttpAction({ type: 'ERROR', errorData: error.message });
        } 
    }, []);

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        requestExtra: httpState.extra,
        requestIdentifier: httpState.identifier
    };
};

export default useHttp;