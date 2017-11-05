import dispatcher from "./CounterDispatcher";
import ActionTypes from "./CounterActionTypes";

export default new class CounterActions{
    increment(){
        dispatcher.dispatch({
            type: ActionTypes.INCREMENT
        });
    }
    decrement(){
        dispatcher.dispatch({
            type: ActionTypes.DECREMENT
        });
    }
    update(newNumber){
        dispatcher.dispatch({
            type: ActionTypes.UPDATE,
            number: newNumber
        });
    }
};