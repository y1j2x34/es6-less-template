import counterActions from "../src/app/CounterActions";
import counterStore from "../src/app/CounterStore";
import dispatcher from '../src/app/CounterDispatcher';
import chai from 'chai';

chai.should();

describe('counter actions ', () => {
    var dispatchToken;
    beforeEach(() => {
        if (dispatchToken) {
            dispatcher.unregister(dispatchToken);
        }
        counterActions.update(0);
    });

    it('increment', () => {
        counterStore.getState().should.eq(0);
        dispatchToken = dispatcher.register(function(){
            counterStore.getState().should.eq(1);
        });
        counterActions.increment();
    });
    
    it('decrement', () => {
        counterStore.getState().should.eq(0)
        dispatchToken = dispatcher.register(function() {
            counterStore.getState().should.eq(-1);
        });
        counterActions.decrement();
    });
});
