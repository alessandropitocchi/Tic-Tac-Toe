// ad cpu play

"use strict";

let pname1 = ''
let pname2 = ''

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

const titleScreen = (()=>{
    const titleScreen = document.querySelector('.titleScreen')
    const startGameBtn = document.querySelector('.startGameBtn')
    const message = document.querySelector('.message')
    const playerName = document.querySelector('.playerName')

    startGameBtn.addEventListener('click', () => {
        titleScreen.classList.remove('active')
        titleScreen.classList.add('hidden')
        const player1 = document.getElementById('player1').value
        const player2 = document.getElementById('player2').value
        pname1 = player1
        pname2 = player2
        message.textContent = `${pname1}, make your move!`
    })

    const resetScreen = () =>{
        titleScreen.classList.add('active')
        titleScreen.classList.remove('hidden')
        playerName.reset()
    }

    return{
        resetScreen
    }
})()

const displayController = (() =>{
    const cells = document.querySelectorAll('.element')
    const resetBtn = document.querySelector('.resetBtn')
    const homeBtn = document.querySelector('.homeBtn')
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
        message.classList.remove('fs')
        message.textContent = `${pname1}, make your move!`
    })

    homeBtn.addEventListener('click', () => {
        location.reload()
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
            message.classList.add('fs')
            if (result === 'X') {
                setMessage(`${pname1} has won!`)
            } else{
                setMessage(`${pname1} has won!`)
            }
            
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
        displayController.setMessage(`${getCurrentSign() === 'X' ? pname1 : pname2}, make your move!`);
    }

    return{
        playRound,
        getIsFinish,
        resetGame
    }
})()