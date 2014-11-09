function Automata(GameManager) {
    this.gm = GameManager;

    this.active = false;
    this.delay = 500;
}

// Toggles the Automata
Automata.prototype.toggle = function () {
    this.active = !this.active;
    if(this.active){
        targetAutomata = document.getElementsByClassName("automata-select")[0].
            value;
        console.debug("Automata toggled on");
        console.debug("Automata in use: " + targetAutomata);
        setColor = "#FF0000";
        this.init(targetAutomata);
    }else{
        console.debug("Automata toggled off");
        setColor = "#776E65";
    }
    elems = document.getElementsByClassName("title");
    for (i = 0; i < elems.length; i++) {
        elems[i].style.color = setColor;
    }
}

// Initiates a specific Automata
Automata.prototype.init = function (name) {
    switch(name){
        case "random":
        this.randomAutomata();
        break;
    }
}

// Sends a move command to the GameManager
Automata.prototype.sendMove = function (direction) {
    switch(direction){
        case 0:
        console.debug("Move up");
        break;
        case 1:
        console.debug("Move right");
        break;
        case 2:
        console.debug("Move down");
        break;
        case 3:
        console.debug("Move left");
        break;
    }
    this.gm.move(direction);
}

// this-binding workaround (courtesy of MDN)
Automata.prototype.setTimeoutWO = function (vCallback, nDelay) {
    if(this.active){
        var oThis = this, aArgs = Array.prototype.slice.call(arguments, 2);
        return window.setTimeout(vCallback instanceof Function ? function () {
            vCallback.apply(oThis, aArgs);
        } : vCallback, nDelay);
    }
};

Automata.prototype.goAhead = function () {
    return (!this.gm.over && !this.gm.won);
}

// Random Direction Automata - debug only, really
Automata.prototype.randomAutomata = function () {
    if(this.goAhead()){
        dir = Math.floor(Math.random() * 4);
        this.sendMove(dir);
        this.setTimeoutWO(this.randomAutomata,this.delay);
    }else{
        this.toggle();
    }
}
