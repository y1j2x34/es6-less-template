import counterActions from "./CounterActions";
import counterStore from "./CounterStore";
import dispatcher from "./CounterDispatcher";

console.info(counterStore);

class CounterView{
    constructor(incrementButton, decrementButton, displayer){
        this.incrementButton = incrementButton;
        this.decrementButton = decrementButton;
        this.displayer = displayer;
    }
    init(){
        this._bindView();
    }
    _bindView(){
        var self = this;
        self.incrementButton.addEventListener("click", function(){
            counterActions.increment();
        });
        self.decrementButton.addEventListener("click", function(){
            counterActions.decrement();
        });
        var lastNumber = 0;
        self.displayer.addEventListener("input", function(){
            var value = self.displayer.value;
            var number = parseInt(value);
            if(isNaN(number)){
                self.displayer.value = lastNumber;
            } else {
                counterActions.update(number);
            }
            lastNumber = number;
        });
        self.dispatchToken = dispatcher.register(function(){
            if(counterStore.hasChanged()){
                self.displayer.value = counterStore.getState();
            }
        });
    }
    destroy(){
        if(this.dispatchToken){
            dispatcher.unregister(this.dispatchToken);
        }
        this.incrementButton.removeEventListener("click");
        this.decrementButton.removeEventListener("click");
        this.displayer.removeEventListener("input");
    }
}

export default CounterView;