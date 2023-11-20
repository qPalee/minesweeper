let cols;
let rows;
let grid;

let bombsGenerated = false;
let noBombsGenerated = 0;
let tilesChecked = [];

let flagImg;

function preload(){
  flagImg = loadImage("flag.png");
}

function setup(){
  //Creates canvas to draw on
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.position(0, 0);
  background(150);

  cols = 18;
  rows = 13;
  
  //Creates a grid as a 2D array
  grid = new Array(cols);
  
  for(let i = 0; i < grid.length; i++){
    grid[i] = new Array(rows);
  }

  //Fills the grid with 'Boxes'
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      grid[x][y] = new Box(x, y);
    }
  }
}

function draw(){ //Loops every frame

  //Draws grid
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      grid[x][y].show();
    }
  }
}

function mousePressed(){ 
  for(let x = 0; x < cols; x++){
    for(let y = 0; y < rows; y++){
      if(grid[x][y].pressed()){
        if(mouseButton == LEFT){
          if(!grid[x][y].clicked){
            if(!bombsGenerated){
              generateBombs(x, y); //generated bombs after inital click  if not already done, means player cant click and immediately die
            }else{
              if(!grid[x][y].hasBomb){
                if(!grid[x][y].flag){
                  grid[x][y].clicked = true;
                  grid[x][y].colour = color(255);
                  checkSurroundingBombs(grid[x][y]);
                  //Player clicked a free space and recursively checks for any  bombs  surrounding it
                }
              }else{
                //Player clicked on a bomb
                console.log("You lose");
                noLoop();
              }
            }
          }
        }

        if(mouseButton == RIGHT){ //Creates/removes flags
          if(!grid[x][y].clicked){
            grid[x][y].flag = !grid[x][y].flag;
          }
        }
      }
    }
  }
}

function generateBombs(x, y) { //generated bombs after player initallly clicks for first time
  let area = cols * rows;
  let noBombs = Math.round((area / 6)/10) * 10;
  let xPos;
  let yPos;
  while(noBombsGenerated < noBombs){
    xPos = Math.floor(random(cols));
    yPos = Math.floor(random(rows));
    if(!grid[xPos][yPos].hasBomb){
      if((xPos < x - 1 || xPos > x + 1) || (yPos < y - 1 || yPos > y + 1)){
        grid[xPos][yPos].hasBomb = true;
        noBombsGenerated++;
      }
    }
  }

  //tells each tile what bombs are surrounding it

  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      if (i < cols - 1) {
      grid[i][j].tilesSurrounding.push(grid[i + 1][j]);
    }
    if (i > 0) {
      grid[i][j].tilesSurrounding.push(grid[i - 1][j]);
    }
    if (j < rows - 1) {
      grid[i][j].tilesSurrounding.push(grid[i][j + 1]);
    }
    if (j > 0) {
      grid[i][j].tilesSurrounding.push(grid[i][j - 1]);
    }
    if (i > 0 && j > 0) {
      grid[i][j].tilesSurrounding.push(grid[i - 1][j - 1]);
    }
    if (i < cols - 1 && j > 0) {
      grid[i][j].tilesSurrounding.push(grid[i + 1][j - 1]);
    }
    if (i > 0 && j < rows - 1) {
      grid[i][j].tilesSurrounding.push(grid[i - 1][j + 1]);
    }
    if (i < cols - 1 && j < rows - 1) {
      grid[i][j].tilesSurrounding.push(grid[i + 1][j + 1]);
    }
      
    }
  }

    //idk what this does tbh
    for(let i = 0; i < cols; i++){
      for(let j = 0; j < rows; j++){
        for(let k = 0; k < grid[i][j].tilesSurrounding.length; k++){
          if(grid[i][j].tilesSurrounding[k].hasBomb){
            grid[i][j].noBombsSurrounding++;
          }
        }
      }
    }

  grid[x][y].clicked = true;
  grid[x][y].colour = color(255);

  checkSurroundingBombs(grid[x][y]);

  bombsGenerated = true;
}

//recursively checks for bombs
function checkSurroundingBombs(tile){
  if(tile.noBombsSurrounding == 0){
    if(!tilesChecked.includes(tile)){
      tilesChecked.push(tile)
      for(let i = 0; i < tile.tilesSurrounding.length; i++){
        tile.tilesSurrounding[i].clicked = true;
        tile.tilesSurrounding[i].colour = color(255);
        checkSurroundingBombs(tile.tilesSurrounding[i])
      }
    }
  }
}