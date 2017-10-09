import {
    Dispatcher
} from "flux";
import {
    ReduceStore
} from "flux/utils";

class CounterStore extends ReduceStore {
    getInitialState() {
        return 0;
    }
    reduce(state, action) {
        switch (action.type) {
            case "increment":
                return state + 1;
            case "square":
                return state * state;
            default:
                return state;
        }
    }
}