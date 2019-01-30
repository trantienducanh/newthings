var mCanvas = document.getElementById("mycanvas");
var context = mCanvas.getContext('2d');

const p1 = mCanvas.width / 4;
const p2 = mCanvas.width / 8;
const font4 = "30px Arial";
const font8 = "17px Arial";

var nums = 4;
var sqr = p1;
var change = false;

var valueArr = ["0", "2", "4", "8", "16", "32", "64", "128", "256", "512", "1024", "2048"];
var colorArr = ["","yellow", "purple", "cyan","black","blue","red","green","brown","gray","pink","gold"];
var  textColor = ["","black", "white", "white","white","white","white","white","white","white","black","white","white"];
var gameBoard = [];
function setGameBoardValue(rowNumber, collNumber, value)
{
    gameBoard[rowNumber + collNumber * nums] = value;
    
}
function getGameBoardValue(rowNumber, collNumber)
{
    return gameBoard[rowNumber + collNumber * nums];
}
function swapGameBoardValue(y1, x1, y2, x2)
{
    setGameBoardValue(y1, x1, getGameBoardValue(y2, x2));
    setGameBoardValue(y2, x2, 0);
}
function mergeGameBoardValue(y1, x1, y2, x2)
{
    setGameBoardValue(y1, x1, getGameBoardValue(y2, x2)+1);
    setGameBoardValue(y2, x2, 0);
}
function createNewSquare()
{
    var posInArr = parseInt(Math.random() * 10000 % (nums*nums-1));
    var _value =  parseInt(Math.random() + 0.35 + 1);

    if (gameBoard[posInArr] != 0)
    {
        alert("step1 : " + possInArr +" " + gameBoard[posInArr]);
        posInArr++;
        while(gameBoard[posInArr] != 0)
        {
            posInArr = parseInt(Math.random() * 10000 % (nums*nums-1));
            _value =  parseInt(Math.random() + 0.2 + 1);
        }
    }

    gameBoard[posInArr] = _value;
}
function initGameBoard(_nums)
{
    // emty the gameBoard
    var numOfSquares = _nums *_nums - gameBoard.length; 
    for ( var i = 0; i < gameBoard.length; i++) gameBoard[i] = 0;
    for ( var i = 0; i < numOfSquares ; i++) gameBoard.push(0);
    
    // split gameBoard to 4x4 or 8x8 squares
    split(_nums);

    // Display a cleared gameBoard
    context.clearRect(0, 0, mCanvas.width, mCanvas.height);
}
function drawFrames(_nums)
{
    for(var i = 1; i < _nums; i++)
    {
      // straight line
        context.beginPath();
        context.strokeStyle = "salmon";
        context.lineWidth = 5;
        context.moveTo(sqr * i, 0);
        context.lineTo(sqr * i, mCanvas.height);
        context.stroke();        
            
        // narrow line
        context.beginPath();
        context.strokeStyle = "salmon";
        context.lineWidth = 5;
        context.moveTo(0, sqr * i);
        context.lineTo(mCanvas.width, sqr * i);
        context.stroke();
    }
}
function split (_nums)
{
    if (_nums == 4) sqr = p1;
    else sqr = p2;

    nums = _nums;
}
function drawSquareRect(_x, _y, _value){
    var text = valueArr[_value];
    
    context.fillStyle = colorArr[_value];
    context.fillRect(_x * sqr, _y * sqr, sqr, sqr);
    
    context.fillStyle = textColor[_value];
    context.textAlign ="center";
    context.textStyle = "bold";
    
    if (nums == 4) context.font = font4;
    else context.font = font8;
    context.fillText(text, _x * sqr + sqr/ 2 - text.length , _y * sqr + sqr / 2 + 3); 

}
function drawFirstSquares()
{
    for ( var i = 0; i < 10; i++){
        var _x = parseInt(Math.random() * 101 % nums);
        var _y = parseInt(Math.random() * 101 % nums);
        var _value = parseInt(Math.random() + 0.55 + 1);

        ////alert ( _x + " " + _y + " = " + _value);
        setGameBoardValue(_y, _x, _value);
        drawSquareRect(_x,_y, _value); 
    }
}
function drawAllSquares(){
    for (var i = 0; i < nums; i++)
    {
        for ( var j = 0; j < nums; j++)
        {
            if (getGameBoardValue(i, j) != 0) 
            {
                drawSquareRect(j , i, getGameBoardValue(i, j));
            }
        }
    }
}
function EventProcessing()
{
    // if (UpEvent(event))
    document.onkeydown = function (e)
    {
        //e = window.event;
        change = false;
        switch(e.keyCode)
        {
            case 37 : left_gathering(); break; 
            case 38 : up_gathering(); break;
            case 39 : right_gathering(); break;
            case 40 : down_gathering(); break;
        }    
        if (change == true) createNewSquare();
        context.clearRect(0, 0, mCanvas.width, mCanvas.height);
        drawAllSquares();
        drawFrames(nums);
        
        //if (EndGame() == true) //alert("Full of Numbers");
    }
    
}

function up_gathering(){
    for ( var i = 0; i < nums; i++)
    {
        var target = 0, index = 1;
        while (target < nums && index < nums)
        {
            if (getGameBoardValue(target, i) != 0)
            {
                if (getGameBoardValue(index, i) == 0) index++;
                else if (getGameBoardValue(index, i) == getGameBoardValue(target, i))
                {
                    // //gameBoard[target][i]++; gameBoard[index][i] = 0;
                    //alert("s1");
                    mergeGameBoardValue(target, i, index, i);
                    change = true;
                    target++;
                    index++;
                }
                else if (getGameBoardValue(index, i) != getGameBoardValue(target, i))
                {
                    //alert("s2");
                    // put index value on top the target position, return 0 to index position
                    if (index - 1 > target) 
                    {
                        swapGameBoardValue(target + 1 , i, index, i);
                        change = true; 
                    }
                    target++;
                    index++;
                }
            }
            else {
                
                if ( getGameBoardValue(index, i) == 0 ) index++;
                else {
                     ////alert("s3");
                     //gameBoard[target][i] = gameBoard[index][i], gameBoard[index][i] = 0;
                     swapGameBoardValue(target, i, index, i);
                     change = true;
                     index++;
                }
            }
            //alert(1);
        }
    }
}
function down_gathering(){
    for ( var i = nums-1; i >= 0; i--)
    {
        var target = nums-1, index = nums-2;
        while (target >= 0 && index >= 0)
        {
            if (getGameBoardValue(target, i) != 0)
            {
                if (getGameBoardValue(index, i) == 0) index--;
                else if (getGameBoardValue(index, i) == getGameBoardValue(target, i))
                {
                    // //gameBoard[target][i] =++; gameBoard[index][i] = 0;
                    ////alert("s1");
                    mergeGameBoardValue(target, i, index, i);
                    change = true;
                    target--;
                    index--;
                }
                else if (getGameBoardValue(index, i) != getGameBoardValue(target, i))
                {
                    ////alert("s2");
                    // put index value on top the target position, return 0 to index position
                    if (index + 1 < target) 
                    { 
                        swapGameBoardValue(target - 1 , i, index, i);
                        change = true;
                    }
                    target--;
                    index--;
                }
            }
            else {
                if ( getGameBoardValue(index, i) == 0 ) index--;
                else {
                     ////alert("s3");
                     //gameBoard[target][i] = gameBoard[index][i], gameBoard[index][i] = 0;
                     swapGameBoardValue(target, i, index, i);
                     index--;
                     change = true;
                }
            }
            //alert(2);
        }
    }
}
function right_gathering(){
    for ( var i = nums-1; i >= 0; i--)
    {
        var target = nums-1, index = nums-2;
        while (target >= 0 && index >= 0)
        {
            if (getGameBoardValue(i, target) != 0)
            {
                if (getGameBoardValue(i, index) == 0) index--;
                else if (getGameBoardValue(i, index) == getGameBoardValue(i, target))
                {
                    // gameBoard[i][target]++; gameBoard[i][index] = 0;
                    ////alert("s1");
                    mergeGameBoardValue(i, target, i, index);
                    target--;
                    index--;
                    change = true;
                }
               
                else if (getGameBoardValue(i, index) != getGameBoardValue(i, target))
                {
                    ////alert("s2");
                    // put index value on top the target position, return 0 to index position
                    if (index + 1 < target) 
                    { 
                        swapGameBoardValue(i, target - 1, i, index);
                        change = true;
                    }
                    target--;
                    index--;
                }
                
            }
            else {
                if ( getGameBoardValue(i, index) == 0 ) index--;
                else {
                     ////alert("s3");
                     // target position get index value, index position value = 0;
                     swapGameBoardValue(i, target, i, index);
                     change = true;
                     index--;
                }
            }
            //alert(3);
        }
    }
}
function left_gathering(){
    for ( var i = 0; i < nums ; i++)
    {
        var target = 0, index = 1;
        while (target < nums && index < nums)
        {
            if (getGameBoardValue(i, target) != 0)
            {
                if (getGameBoardValue(i, index) == 0) index++;
                else if (getGameBoardValue(i, index) == getGameBoardValue(i, target))
                {
                    // gameBoard[i][target]++; gameBoard[i][index] = 0;
                    ////alert("s1");
                    mergeGameBoardValue(i, target, i, index);
                    
                    target++;
                    index++;
                    change = true;
                }
               
                else if (getGameBoardValue(i, index) != getGameBoardValue(i, target))
                {
                    ////alert("s2");
                    // put index value to the previous of the target position, return 0 to index position
                    if (index - 1 > target) 
                    {
                        swapGameBoardValue(i, target + 1, i, index);
                        change = true;
                    }
                    target++;
                    index++;
                }
                
            }
            else {
                if ( getGameBoardValue(i, index) == 0 ) index++;
                else {
                     ////alert("s3");
                     // target position get index value, index position value = 0;
                     swapGameBoardValue(i, target, i, index);
                     change = true;
                     index++;
                }
            }
            //alert(4);
        }
    }
}
function playGame(_nums)
{
    initGameBoard(_nums);
    drawFirstSquares();
    drawFrames(_nums);
    EventProcessing();
}

