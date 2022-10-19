// ad cpu play

"use strict";

const Player = (sign) => {
    const getSign = () => { return sign; }
    
    return {
        getSign
    }
}

const gameBoard = (() => {
    let _board = ["","","","","","","","",""]

    const setBoard = (index, mark) => {
        _board[index] = mark 
    }

    const getBoard = (index) => {
        return _board[index]
    }

    const resetBoard = () => {
        for(let i = 0; i < _board.length; i++){
            _board[i] = ""
        }
    }

    return {
        setBoard,
        getBoard,
        resetBoard
    }
})()

const displayController = (() =>{
    const cells = document.querySelectorAll('.element')
    const resetBtn = document.querySelector('.resetBtn')
    const message = document.querySelector('.message')

    cells.forEach(cell => {
        cell.addEventListener('click', (e) => {
            if(cell.textContent !== "" || gameController.getIsFinish() === true) return
            gameController.playRound(parseInt(e.target.dataset.index))
            updateGameBoard()
        })
    })

    resetBtn.addEventListener('click', () => {
        gameController.resetGame()
        gameBoard.resetBoard()
        updateGameBoard()
        setMessage("")
    })

    const updateGameBoard = () => {
        for(let i = 0; i < cells.length; i++){
            cells[i].textContent = gameBoard.getBoard(i)
        }
    }

    const setMessage = (msg) => {
        message.textContent = msg
    }

    const setResultMessage = (result) => {
        if (result === "Draw"){
            setMessage("It's a draw")
        } else {
            setMessage(`Player ${result} has won!`)
        }
    }
 
    return {
        setMessage,
        setResultMessage
    }
})()

const gameController = (() => {
    const playerX = Player('X')
    const playerO = Player('O')
    let _round = 1
    let isFinish = false

    const getCurrentSign = () => {
        return _round % 2 === 0 ? playerO.getSign() : playerX.getSign()
    }

    const checkWinner = (index) => {
        const winCond = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        return winCond
            .filter((combinations) => combinations.includes(index))
            .some((possibleCombination) => 
                possibleCombination.every(
                    (index) => gameBoard.getBoard(index) === getCurrentSign()
                )
            )
    }

    const getIsFinish = () => {
        return isFinish
    }

    const resetGame = () => {
        _round = 1
        isFinish = false
    }

    const playRound = (index) => {
        gameBoard.setBoard(index, getCurrentSign())
        if(checkWinner(index)){
            displayController.setResultMessage(getCurrentSign())
            isFinish = true
            return;
        }
        if(_round===9){
            displayController.setResultMessage("Draw")
            isFinish = true
            return;
        }
        _round += 1
        displayController.setMessage(`Player ${getCurrentSign()}'s turn`);
    }

    return{
        playRound,
        getIsFinish,
        resetGame
    }
})()