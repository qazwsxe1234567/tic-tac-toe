const playerOne = '\u2716'
const BOT = '\u25EF'

let ticTacToe;
if (typeof window != 'undefined') {
    window.onload = function () {
        const gridContainer = document.getElementById("tic-tac-toe-grid-container");
        ticTacToe = new TicTacToe(gridContainer);
    };
}


function TicTacToe(grid) {
    this.container = grid;
    this.winner = ""
    this.lastMove = BOT

    this.setCellWin = function (row, column) {
        const element = document.getElementById(row + '_' + column)
        element.setAttribute('class', element.className + ' win')
    }

    this.setRowWin = function (row) {
        this.setCellWin(row, 1)
        this.setCellWin(row, 2)
        this.setCellWin(row, 3)
    }

    this.setColumnWin = function (column) {
        this.setCellWin(1, column)
        this.setCellWin(2, column)
        this.setCellWin(3, column)
    }

    this.getCellValue = function (row, column) {
        console.log(row + '_' + column)
        const element = document.getElementById(row + '_' + column)
        return element.innerText
    }

    this.check = function () {
        for (let row = 1; row <=3; row++ ) {
            this.checkRow(row, playerOne)
        }
        for (let row = 1; row <=3; row++ ) {
            this.checkRow(row, BOT)

        }
        for (let column= 1; column <=3; column++ ) {
            this.checkColumn(column, BOT)

        }
        for (let column= 1; column <=3; column++ ) {
            this.checkColumn(column, playerOne)
        }
        this.checkLeftDiagonal(BOT);
        this.checkLeftDiagonal(playerOne);
        this.checkRightDiagonal(playerOne);
        this.checkRightDiagonal(BOT);
    }

    this.checkLeftDiagonal = function (player) {
        if (this.getCellValue(1, 1) === player &&
            this.getCellValue(2, 2) === player &&
            this.getCellValue(3, 3) === player) {

            this.setCellWin(1, 1)
            this.setCellWin(2, 2)
            this.setCellWin(3, 3)
            this.winner = player

        }
    }

    this.checkRightDiagonal = function (player) {
        if (this.getCellValue(1, 3) === player &&
            this.getCellValue(2, 2) === player &&
            this.getCellValue(3, 1) === player) {

            this.setCellWin(1,3)
            this.setCellWin(2,2)
            this.setCellWin(3,1)
            this.winner = player
        }
    }

    this.checkRow = function (row, player) {
        if (this.getCellValue(row, 1) === player &&
            this.getCellValue(row, 2) === player &&
            this.getCellValue(row, 3) === player) {

            this.setRowWin(row)
            this.winner = player
        }
    }

    this.checkColumn = function (column, player) {
        if (this.getCellValue( 1, column) === player &&
            this.getCellValue(2, column) === player &&
            this.getCellValue(3, column) === player) {

            this.setColumnWin(column)
            this.winner = player
        }
    }

    this.choose = function (event, element){
        const position = element.id.split('_')
        console.log("Row:" + position[0] + "Column:" + position[1])
        if (this.winner === '') {
            if (this.lastMove === BOT) {
                element.innerText = playerOne
                this.lastMove = playerOne
            } else {
                element.innerText = BOT
                this.lastMove = BOT

            }
            this.check()
            if (this.winner !== '') {
                document.getElementById('Winner').innerText = this.winner + ' Winner'
            }
        }
    }
}