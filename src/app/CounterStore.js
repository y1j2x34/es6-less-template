import dispatcher from './CounterDispatcher';
import ActionTypes from "./CounterActionTypes";
import { ReduceStore } from 'flux/utils';

class CounterStore extends ReduceStore {
    constructor() {
        super(dispatcher);
    }
    getInitialState() {
        return 0;
    }
    reduce(state, action) {
        switch (action.type) {
            case ActionTypes.INCREMENT:
                return state + 1;
            case ActionTypes.DECREMENT:
                return state - 1;
            case ActionTypes.UPDATE:
                return action.number;
            default:
                return state;
        }
    }
}

export default new CounterStore();
