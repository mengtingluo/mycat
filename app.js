/**
  Created by Meta Luo on 2015/11/17.
 **/
var stage = new createjs.Stage("gameView");
createjs.Ticker.setFPS(30);
createjs.Ticker.addEventListener("tick", stage);

var gameView = new createjs.Container();
gameView.x = 30;
gameView.y = 30;
stage.addChild(gameView);
var circleArr = [[], [], [], [], [], [], [], [], []];
var currentCat;

var MOVE_NONE = -1, MOVE_LEFT = 0, MOVE_RIGHT = 1, MOVE_LEFT_TOP = 2, MOVE_RIGHT_TOP = 3, MOVE_LEFT_BOTTOM = 4, MOVE_RIGHT_BOTTOM = 5;
function getMoveDir(cat) {
    var distanceMap = [];
    var can = true;
    for (var x = cat.indexX; x >= 0; x--) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_LEFT] = can.indexX - x;
            break;
        }
    }
    if (can) {
        return MOVE_LEFT;
    }
    can = true;
    var x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_LEFT_TOP] = cat.indexY - y;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y--;
        if (x < 0 || y < 0) {
            break;
        }
    }
    if (can) {
        return MOVE_LEFT_TOP;
    }
    can = true
    var x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_RIGHT_TOP] = cat.indexY - y;
            break;
        }
        if (y % 2 == 1) {
            x++;
        }
        y--;
        if (x < 0 || y > 8) {
            break;
        }
    }
    if (can) {
        return MOVE_RIGHT_TOP;
    }
    can = true;
    for (var x = cat.indexX; x < 9; x++) {
        if (circleArr[x][cat.indexY].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_RIGHT] = x - cat.indexX;
            break;
        }
    }
    if (can) {
        return MOVE_RIGHT;
    }
    can = true;
    var x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_LEFT_BOTTOM] = y - cat.indexY;
            break;
        }
        if (y % 2 == 0) {
            x--;
        }
        y++;
        if (x < 0 || y > 8) {
            break;
        }
    }
    if (can) {
        return MOVE_LEFT_BOTTOM;
    }
    can = true;
    var x = cat.indexX, y = cat.indexY;
    while (true) {
        if (circleArr[x][y].getCircleType() == Circle.TYPE_SELECTED) {
            can = false;
            distanceMap[MOVE_RIGHT_BOTTOM] = y - cat.indexY;
            break;
        }
        if (y % 2 == 1) {
            x++;
        }
        y++;
        if (x > 8 || y > 8) {
            break;
        }
    }
    if (can) {
        return MOVE_RIGHT_BOTTOM;
    }
    var maxDir = -1, maxValue = -1;
    for (var dir = 0; dir < distanceMap.length; dir++) {
        if (distanceMap[dir] > maxValue) {
            maxValue = distanceMap[dir];
            maxDir = dir;
        }
    }
    if (maxValue > 1) {
        return maxDir;
    } else {
        return MOVE_NONE;
    }
}
var i=0
function circleClicked(event) {
    if (event.target.getCircleType() != Circle.TYPE_CAT) {
        event.target.setCirclrType(Circle.TYPE_SELECTED);
    } else {
        return;
    }
    if (currentCat.indexX == 0 || currentCat.indexX == 8 || currentCat.indexY == 0 || currentCat.indexY == 8) {
        alert("你没有抓住神经猫！");
        return;
    }

    var dir = getMoveDir(currentCat);
    switch (dir) {
        case MOVE_LEFT:
            currentCat.setCirclrType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX - 1][currentCat.indexY];
            currentCat.setCirclrType(Circle.TYPE_CAT);
            break;
        case MOVE_LEFT_TOP:
            currentCat.setCirclrType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX : currentCat.indexX - 1][currentCat.indexY - 1];
            currentCat.setCirclrType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT_TOP:
            currentCat.setCirclrType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX + 1 : currentCat.indexX][currentCat.indexY - 1];
            currentCat.setCirclrType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT:
            currentCat.setCirclrType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexX + 1][currentCat.indexY];
            currentCat.setCirclrType(Circle.TYPE_CAT);
            break;
        case MOVE_LEFT_BOTTOM:
            currentCat.setCirclrType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX : currentCat.indexX - 1][currentCat.indexY + 1];
            currentCat.setCirclrType(Circle.TYPE_CAT);
            break;
        case MOVE_RIGHT_BOTTOM:
            currentCat.setCirclrType(Circle.TYPE_UNSELECTED);
            currentCat = circleArr[currentCat.indexY % 2 ? currentCat.indexX + 1 : currentCat.indexX][currentCat.indexY + 1];
            currentCat.setCirclrType(Circle.TYPE_CAT);
            break;
        default :
            alert("你抓到神经猫了！");
    }

}

function addCricle() {
    for (var indexY = 0; indexY < 9; indexY++) {
        for (var indexX = 0; indexX < 9; indexX++) {
            var c = new Circle();
            gameView.addChild(c);
            circleArr[indexX][indexY] = c;
            c.indexX = indexX;
            c.indexY = indexY;
            c.x = indexY % 2 ? indexX * 55 + 25 : indexX * 55;
            c.y = indexY * 55;
            if (indexX == 4 && indexY == 4) {
                c.setCirclrType(Circle.TYPE_CAT);
                currentCat = c;
            } else if (Math.random() < 0.1) {
                c.setCirclrType(Circle.TYPE_SELECTED)
            }

            c.addEventListener("click",circleClicked)
        }
    }
}
addCricle();
