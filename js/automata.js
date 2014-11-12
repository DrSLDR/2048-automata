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
        this.randomA();
        break;
        case "randomAvail":
        this.randomAvailA();
        break;
        case "randomAvailMerge":
        this.randomAvailMergeA();
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
    // 0: up, 1: right, 2: down, 3: left
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

// Returns the matrix representation of the grid
Automata.prototype.getGrid = function () {
    this.grid = this.gm.grid.cells;
}

// Analysis function - tests if movement up possible
Automata.prototype.canMoveUp = function () {
    for(x = 0; x < 4; x++){
        hasGap = false;
        for(y = 0; y < 4;  y++){
            if(this.grid[x][y] && hasGap){
                return true;
            }else if(!this.grid[x][y]){
                hasGap = true;
            }}}
    return false;
}

// Analysis function - tests if movement right possible
Automata.prototype.canMoveRight = function () {
    for(y = 0; y < 4; y++){
        hasGap = false;
        for(x = 3; x >= 0; x--){
            if(this.grid[x][y] && hasGap){
                return true;
            }else if(!this.grid[x][y]){
                hasGap = true;
            }}}
    return false;
}

// Analysis function - tests if movement down possible
Automata.prototype.canMoveDown = function () {
    for(x = 0; x < 4; x++){
        hasGap = false;
        for(y = 3; y >= 0;  y--){
            if(this.grid[x][y] && hasGap){
                return true;
            }else if(!this.grid[x][y]){
                hasGap = true;
            }}}
    return false;
}

// Analysis function - tests if movement left possible
Automata.prototype.canMoveLeft = function () {
    for(y = 0; y < 4; y++){
        hasGap = false;
        for(x = 0; x < 4; x++){
            if(this.grid[x][y] && hasGap){
                return true;
            }else if(!this.grid[x][y]){
                hasGap = true;
            }}}
    return false;
}

// Analysis function - returns value of all possible horizontal merges
Automata.prototype.canMergeH = function () {
    sum = 0;
    for(y = 0; y < 4; y++){
        row = 0;
        for(x = 0; x < 4; x++){
            if(this.grid[x][y]){
                if(row == this.grid[x][y].value){
                    sum += row * 2;
                    row = 0;
                }else{
                    row = this.grid[x][y].value;
                }}}}
    return sum;        
}

// Analysis function - returns value of all possible vertical merges
Automata.prototype.canMergeV = function () {
    sum = 0;
    for(x = 0; x < 4; x++){
        col = 0;
        for(y = 0; y < 4; y++){
            if(this.grid[x][y]){
                if(col == this.grid[x][y].value){
                    sum += col * 2;
                    col = 0;
                }else{
                    col = this.grid[x][y].value;
                }}}}
    return sum;        
}

// Tests if an automata is clear to go ahead and move
Automata.prototype.goAhead = function () {
    return (!this.gm.over && !this.gm.won);
}

// Random Direction Automata - debug only, really
Automata.prototype.randomA = function () {
    if(this.goAhead()){
        dir = Math.floor(Math.random() * 4);
        this.sendMove(dir);
        this.setTimeoutWO(this.randomA,this.delay);
    }else{
        this.toggle();
    }
}

// Random Available Direction Automata - introduces grid processing
Automata.prototype.randomAvailA = function () {
    if(this.goAhead()){
        this.getGrid();
        allowedMoves = [];
        if(this.canMoveUp()){allowedMoves.push(0);}
        if(this.canMoveRight()){allowedMoves.push(1);}
        if(this.canMoveDown()){allowedMoves.push(2);}
        if(this.canMoveLeft()){allowedMoves.push(3);}
        if(allowedMoves.length == 0) { allowedMoves = [1,2,3,0]; }
        dir = Math.floor(Math.random() * allowedMoves.length);
        this.sendMove(allowedMoves[dir]);
        this.setTimeoutWO(this.randomAvailA,this.delay);
    }else{
        this.toggle();
    }
}

// Random Available Direction With Merge Automata
Automata.prototype.randomAvailMergeA = function () {
    if(this.goAhead()){
        this.getGrid();
        allowedMoves = [];
        mergeH = this.canMergeH();
        mergeV = this.canMergeV();
        if(mergeV > 0 || this.canMoveUp()){ allowedMoves.push(0); }
        if(mergeH > 0 || this.canMoveRight()){ allowedMoves.push(1); }
        if(mergeV > 0 || this.canMoveDown()){ allowedMoves.push(2); }
        if(mergeH > 0 || this.canMoveLeft()){ allowedMoves.push(3); }
        dir = Math.floor(Math.random() * allowedMoves.length);
        this.sendMove(allowedMoves[dir]);
        this.setTimeoutWO(this.randomAvailMergeA,this.delay);        
    }else{
        this.toggle();
    }
}
