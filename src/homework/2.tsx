import React, { FC, ReactElement, useReducer } from "react";

type StateTypes = {
    isRequestInProgress: boolean,
    requestStep:
    'start' |
    'pending' |
    'finished' |
    'idle',
};

type ActionTypes = {
    type:
    'START_REQUEST' |
    'PENDING_REQUEST' |
    'FINISH_REQUEST' |
    'RESET_REQUEST',
};

const initialState: StateTypes = {
    isRequestInProgress: false,
    requestStep: 'idle',
};

const requestReducer = (state: StateTypes, action: ActionTypes): StateTypes => {
    switch (action.type) {
        case 'START_REQUEST':
            return { ...state, isRequestInProgress: true, requestStep: 'start' };
        case 'PENDING_REQUEST':
            return { ...state, isRequestInProgress: true, requestStep: 'pending' };
        case 'FINISH_REQUEST':
            return { ...state, isRequestInProgress: false, requestStep: 'finished' };
        case 'RESET_REQUEST':
            return { ...state, isRequestInProgress: false, requestStep: 'idle' };
        default:
            return state;
    }
}

export const RequestComponent: FC = (): ReactElement => {
    const [requestState, requestDispatch] = useReducer(requestReducer, initialState);

    const startRequest = (): void => {
        requestDispatch({ type: 'START_REQUEST' });
        // Імітуємо запит до сервера
        setTimeout((): void => {
            requestDispatch({ type: 'PENDING_REQUEST' });
            // Імітуємо отримання відповіді від сервера
            setTimeout((): void => {
                requestDispatch({ type: 'FINISH_REQUEST' });
            }, 2000);
        }, 2000);
    };

    const resetRequest = (): void => {
        requestDispatch({ type: 'RESET_REQUEST' });
    };

    return (
        <div>
            <button onClick={startRequest}>Почати запит</button>
            <button onClick={resetRequest}>Скинути запит</button>
            <p>Стан запиту: {requestState.requestStep}</p>
        </div>
    );
    }

export default RequestComponent;
