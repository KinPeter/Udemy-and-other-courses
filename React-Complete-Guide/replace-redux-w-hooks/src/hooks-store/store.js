import { useState, useEffect } from 'react';

let globalState = {};

let listeners = [];

let actions = {};

export const useStore = (shouldListen = true) => {

    const setState = useState(globalState)[1];

    const dispatch = (actionIdentifier, payload) => {
        // call the needed action from the actions array and return a new state
        const newState = actions[actionIdentifier](globalState, payload);
        // merge the new state with the old global state
        globalState = {...globalState, ...newState};
        // notify all listeners (aka call setState) with the new state
        listeners.forEach((listener) => {
            listener(globalState);
        });
    };

    useEffect(() => {
        // when this hook is called in a component, and shouldListen is true, add a reference to the listeners
        if (shouldListen) {
            listeners.push(setState);
        }

        return () => {
            if (shouldListen) {
                // clean up when listener component unmount
                listeners = listeners.filter(listener => listener !== setState);
            }
        };
    }, [setState, shouldListen]);

    // give the hook to return the global state and the dispatch function (just like useReducer())
    return [globalState, dispatch];
};


// with this function each component calls it it will merge the actions and state to the global store
export const initStore = (userActions, initialState) => {
    if (initialState) {
        globalState = {...globalState, ...initialState};
    }
    actions = {...actions, ...userActions};
};