let canvas = document.getElementById("canvas");
let canvasText = canvas.getContext("2d");
let currScore = document.getElementById("score");
let highscore = document.getElementById("highscore");
let inputSize = document.getElementById("inputSize");
let sizeBtn = document.getElementById("sizeBtn");
let newGameBtn = document.getElementById("newGame");
let gameEnd = document.getElementById("gameEnd");
// let tryAgainBtn = document.getElementById("tryAgain");

let score = 0;
let highScore = 0;
let boardSize = 4;
let width = canvas.width / boardSize - 12.5;
let gameLost = false;
let fontSize;
let cells = [];

startGame();

function cell(row, col){
    this.value = 0;
    //y -> row
    //x -> col
    this.x = width*col + 10*(col+1);
    this.y = width*row + 10*(row+1);
}

function canvasClean(){
    canvasText.clearRect(0, 0, 500, 500);
}

function createCells(){

    //i -> row
    //j -> col
    for( var i=0; i< boardSize; i++){    
        // Creating new row
        cells[i] = [];
        for( var j=0; j < boardSize; j++){
            cells[i][j] = new cell(i, j);
        }
    }
}

function drawCell(cell){ 
    
    canvasText.beginPath();
    canvasText.rect(cell.x+5, cell.y+5, width/1.1, width/1.1);

    switch(cell.value){

        case 0    : canvasText.fillStyle = "#efefdf";
                    break;
        case 2    : canvasText.fillStyle = '#dbd6d6';
                    break;
        case 4    : canvasText.fillStyle = '#ede0c8';
                    break;
        case 8    : canvasText.fillStyle = '#f2b179'; 
                    break;
        case 16   : canvasText.fillStyle = '#f59563';
                    break;
        case 32   : canvasText.fillStyle = "#f67c5f";
                    break;
        case 64   : canvasText.fillStyle = '#f65e3b';
                    break;
        case 128  : canvasText.fillStyle = '#edcf72';
                    break;
        case 256  : canvasText.fillStyle = '#edcc61'; 
                    break;
        case 512  :	canvasText.fillStyle = '#edc850';
                    break;
        case 1024 : canvasText.fillStyle = "#edc53f";
                    break;
        case 2048 : canvasText.fillStyle = '#edc22e';
                    break;
        
    }
    canvasText.fill();

    if (cell.value) {
        fontSize = width / 2;
        canvasText.font = fontSize + 'px Arial';
        canvasText.fillStyle = 'black';

        //aligning the text in the centre of the cell
        canvasText.textAlign = 'center';
        canvasText.fillText(cell.value, cell.x + width/2, cell.y + width / 2 + width / 7);
    }
}

function drawCells() {
    
    for( var i = 0; i < boardSize; i++){
        for( var j = 0; j < boardSize; j++){
            drawCell( cells[i][j] );
        }
    }
}

function finishGame(){

    canvas.style.opacity = '0.2';
    gameLost = true;
    highScore = score;
    canvas.style.display = 'inline-block';
    gameEnd.style.opacity = "1";
    gameEnd.classList.remove("hide");
    newGameBtn.innerHTML = "Try Again";
    // tryAgainBtn = document.getElementById("tryAgain");
    // console.log(tryAgainBtn);
}

// tryAgainBtn.addEventListener( "click", function(){
//     console.log("dvbdviusdjnhcjizzubchusihcbushbciszduzj");
// } );

function direction(){

    let left = false;
    let right = false;
    let down = false;
    let up = false;

    //left
    for( var i=0; i<boardSize; i++ ){
        for( var j=0; j<boardSize-1; j++ )	{

            if( cells[i][j+1].value ){
                let col_index = j+1;

                while(col_index - 1 >= 0){
                    if( cells[i][col_index].value === cells[i][col_index-1].value ){
                        left = true;
                        // console.log(" left " + left);
                        return left;
                    }else{
                        col_index--;
                    }
                }
            }
        }
    }

    //right
    for( var i=0; i<boardSize; i++ ){
        for( var j = boardSize - 1; j>0; j-- )	{

            if( cells[i][j-1].value ){
                let col_index = j-1;
                // console.log(" in right ");

                while(col_index + 1 < boardSize){
                    if( cells[i][col_index].value === cells[i][col_index+1].value ){
                        right = true;
                        // console.log(" right " + right);
                        return right;
                    }else{
                        col_index++;
                    }
                }
            }
        }
    }

    //up
    for( var j = 0; j<boardSize; j++ ){
        for( var i = 0; i<boardSize-1; i++ )	{

            if( cells[i+1][j].value ){
                let row_index = i+1;

                while(row_index > 0){
                    if( cells[row_index][j].value === cells[row_index-1][j].value ){
                        up = true;
                        // console.log(" right " + right);
                        return up;
                    }
                    else{
                        row_index--;
                    }
                }
            }
        }
    }

    //down
    for( var j = 0; j<boardSize; j++ ){
        for( var i = boardSize-1; i>0; i-- )	{

            if( cells[i-1][j].value ){
                let row_index = i-1;

                while(row_index + 1 < boardSize){
                    if( cells[row_index][j].value === cells[row_index+1][j].value ){
                        // console.log(" down " + down);
                        down = true;
                        return down;
                    }else{
                        row_index++;
                    }
                }
            }
        }
    }
    return false;
}

function pasteNewCells( event ){

    while(1){

        // Randomly choosing a row and column (0 to boardSize-1)
        let row = Math.floor(Math.random() * boardSize);
        let col = Math.floor(Math.random() * boardSize);

        // Adding a value to cell if it is empty
        if( !cells[row][col].value ){

            // Randomly  generating 2 or 4 as base numbers 
            cells[row][col].value = 2 * Math.ceil(Math.random() * 2);
            drawCells();
            break;
        }	
    }

    let freeCells = 0;    
    for( var i = 0; i < boardSize; i++){
        for( var j = 0; j < boardSize; j++){
            if( !cells[i][j].value ){
                    freeCells++;
            }
        }
    }

    // console.log("freeCells " + freeCells);
    if( !freeCells ){
        
        let dir = direction();
        if( !dir ){
            finishGame();
            return;
        }
    }
}

function startGame(){

    gameEnd.classList.add("hide");
    createCells();
    drawCells();
    pasteNewCells();
    pasteNewCells();
}

sizeBtn.addEventListener( "click", function(){

    if( inputSize.value >= 2 && inputSize.value <= 10 ){
        
        // setting the size of the grid 
        boardSize = inputSize.value;

        // setting the size of the each cell
        width = canvas.width / boardSize - 12;

        if(score > highScore)
            highScore = score;
        highscore.innerHTML = "Best <br> " + highScore;
        score = 0;
        currScore.innerHTML = "Score <br> " + score;
        canvas.style.opacity = '1';
        gameLost = false;
        canvasClean();
        startGame();
    }
});

function newGameFunc(){

    newGameBtn.innerHTML = "New Game";
    if(score > highScore)
        highScore = score;
    highscore.innerHTML = "Best <br> " + highScore;

    score = 0;
    currScore.innerHTML = "Score <br> " + score;
    
    canvas.style.opacity = '1';
    gameLost = false;
    canvasClean();
    startGame();
}

newGameBtn.addEventListener( "click", newGameFunc );

document.addEventListener("keydown", function(event){
    
    // event.preventDefault( event );
    if( !gameLost ){

        if( event.keyCode === 37 )
            moveLeft( 37 );
        else if( event.keyCode === 38 )
            moveUp( 38 );
        else if( event.keyCode === 39 )
            moveRight( 39 );
        else if( event.keyCode === 40 )
            moveDown( 40 );
    }
    currScore.innerHTML = "Score <br> " + score;

});

function moveLeft( event ){

    let movedLeft = false;

    for( var i=0; i<boardSize; i++ ){
        let doubledLeft = false;

        for( var j=0; j<boardSize-1; j++ )	{

            if( cells[i][j+1].value ){
                let col_index = j+1;

                while(col_index - 1 >= 0){

                    //if the block is empty, simply swipe left  
                    if( !cells[i][col_index - 1].value ){

                        movedLeft = true;
                        //swipe left
                        cells[i][col_index - 1].value = cells[i][col_index].value;
                        //make the next block empty
                        cells[i][col_index].value = 0;
                        //for traversing the entire row
                        col_index--;
                    }

                    // if 2 consecutive blocks have same value
                    else if( cells[i][col_index].value === cells[i][col_index-1].value && doubledLeft == false ){
                       
                        movedLeft = true;
                        doubledLeft = true;
                        //doubling up the value
                        cells[i][col_index-1].value *= 2;
                        //updating the score
                        score += cells[i][col_index-1].value;
                        //updating the value of the right block
                        cells[i][col_index].value = 0;
                        break;
                    }
                    
                    else{
                        // console.log('left');
                        break;
                    }
                }
            }
        }
    }
    if(movedLeft)
        pasteNewCells( event );
}

//RIGHT
function moveRight( event ){

    let movedRight = false;

    for( var i=0; i<boardSize; i++ ){
        let doubledRight = false;

        for( var j = boardSize - 1; j>0; j-- )	{

            if( cells[i][j-1].value ){
                let col_index = j-1;

                while(col_index + 1 < boardSize){

                    //if the block is empty, simply swipe left  
                    if( !cells[i][col_index + 1].value ){

                        movedRight = true;
                        //swipe right
                        cells[i][col_index + 1].value = cells[i][col_index].value;
                        //make the next block empty
                        cells[i][col_index].value = 0;
                        //for traversing the entire row
                        col_index++;
                    }

                    // if 2 consecutive blocks have same value
                    else if( cells[i][col_index].value === cells[i][col_index+1].value && doubledRight == false){

                        movedRight = true;
                        doubledRight = true;
                        //doubling up the value
                        cells[i][col_index + 1].value *= 2;
                        //updating the score
                        score += cells[i][col_index + 1].value;
                        //updating the value of the right block
                        cells[i][col_index].value = 0;
                        break;
                    }

                    else{
                        // console.log('right');
                        break;
                    }
                }
            }
        }
    }
    if(movedRight)
        pasteNewCells( event );
}

//UP
function moveUp( event ){

    let movedUp = false;
    
    for( var j = 0; j<boardSize; j++ ){
        let doubledUp = false;

        for( var i = 0; i<boardSize-1; i++ )	{

            if( cells[i+1][j].value ){
                let row_index = i+1;

                while(row_index > 0){
                    //if the block is empty, simply swipe left  
                    if( !cells[row_index - 1][j].value ){
                        
                        movedUp = true;
                        //swipe left
                        cells[row_index - 1][j].value = cells[row_index][j].value;
                        //make the next block empty
                        cells[row_index][j].value = 0;
                        //for traversing the entire row
                        row_index--;
                    }

                    // if 2 consecutive blocks have same value
                    else if( cells[row_index][j].value === cells[row_index-1][j].value && doubledUp == false ){

                        movedUp = true;
                        doubledUp = true;
                        //doubling up the value
                        cells[row_index-1][j].value *= 2;
                        //updating the score
                        score += cells[row_index - 1][j].value;
                        //updating the value of the right block
                        cells[row_index][j].value = 0;
                        break;
                    }

                    else{
                        // console.log('up');
                        break;
                    }
                }
            }
        }
    }
    if( movedUp )
        pasteNewCells( event );
}

//DOWN
function moveDown( event ){

    let movedDown = false;
    
    for( var j = 0; j<boardSize; j++ ){
        let doubledDown = false;

        for( var i = boardSize-1; i>0; i-- ){

            if( cells[i-1][j].value ){
                let row_index = i-1;

                while(row_index + 1 < boardSize){

                    //if the block is empty, simply swipe left  
                    if( !cells[row_index + 1][j].value ){

                        movedDown = true;
                        //swipe left
                        cells[row_index + 1][j].value = cells[row_index][j].value;
                        //make the next block empty
                        cells[row_index][j].value = 0;
                        //for traversing the entire row
                        row_index++;
                    }

                    // if 2 consecutive blocks have same value
                    else if( cells[row_index][j].value === cells[row_index+1][j].value && doubledDown == false){
                        movedDown = true;
                        doubledDown = true;
                        //doubling up the value
                        cells[row_index+1][j].value *= 2;
                        //updating the score
                        score += cells[row_index + 1][j].value;
                        //updating the value of the right block
                        cells[row_index][j].value = 0;
                        break;
                    }

                    else{
                        // console.log('down');
                        break;
                    }
                }
            }
        }
    }
    if(movedDown)
        pasteNewCells( event );
}