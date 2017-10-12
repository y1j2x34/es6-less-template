import CounterView from "./CounterView";
var incrementBtn = document.getElementById("increment");
var decrementBtn = document.getElementById("decrement");
var displayer = document.getElementById("displayer");

const view = new CounterView(incrementBtn, decrementBtn, displayer);
view.init();