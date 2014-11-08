function Automata(GameManager) {
    this.gm = GameManager;

    this.active = false;
    this.moveDelay = 1000;
}

// Toggles the Automata
Automata.prototype.toggle = function () {
    this.active = !this.active;
    if(this.active){
        console.debug("Automata toggled on");
        console.debug("Automata in use: " + 
                      document.getElementsByClassName("automata-select")[0].
                      value);
        setColor = "#FF0000";
    }else{
        console.debug("Automata toggled off");
        setColor = "#776E65";
    }
    elems = document.getElementsByClassName("title");
    for (i = 0; i < elems.length; i++) {
        elems[i].style.color = setColor;
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
