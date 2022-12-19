////////////////////////////////
// Global Variables Here
const gameBoard = [11, 22, 33, 44, 55, 66, 77, 88, 99]
let playerTurn = 1
let playerOneScoreNumber = 0
let playerTwoScoreNumber = 0
let tieScoreNumber = 0
let gameDone = false
let playerTypeNum = 0

const gameBoardBox = document.querySelectorAll(`.gameBoardBox`)
const winnerAnnouncement = document.getElementById(`winnerAnnouncement`)
const nextTurn = document.getElementById(`nextTurn`)
const resetGame = document.getElementById(`resetGame`)
const playerOneScore = document.getElementById(`playerOneScore`)
const playerTwoScore = document.getElementById(`playerTwoScore`)
const tieScore = document.getElementById(`tieScore`)
const changeGameMode = document.getElementById(`changeGameMode`)
const playerType = document.querySelectorAll(`#playerType`)

////////////////////////////////
// Functions For Game Logic Here
const setPlayerBox = (gameBoardBoxPicked) => {
  if (playerTurn % 2) {
    gameBoardBox[gameBoardBoxPicked].innerText = `X`
    gameBoard[gameBoardBoxPicked] = 1
    nextTurn.innerText = `${checkPlayerType()} Turn`
    checkWinner(gameBoard)
    playerTurn++
  } else if (!(playerTurn % 2)) {
    if (playerTypeNum === 0) {
      gameBoardBox[gameBoardBoxPicked].innerText = `O`
      gameBoard[gameBoardBoxPicked] = 2
      nextTurn.innerText = `Player 1 Turn`
      checkWinner(gameBoard)
      playerTurn++
    } else if (playerTypeNum === 1) {
      let computerChoice = setComputerBox()
      gameBoardBox[computerChoice].innerText = `O`
      gameBoard[computerChoice] = 2
      nextTurn.innerText = `Player 1 Turn`
      checkWinner(gameBoard)
      playerTurn++
    }
  }
}

const setComputerBox = () => {
  let computerChoice = Math.floor(Math.random() * 9)
  while (gameBoard[computerChoice] === 1 || gameBoard[computerChoice] === 2) {
    computerChoice = Math.floor(Math.random() * 9)
  }

  return computerChoice
}

const checkWinner = (gameBoard) => {
  if (playerTurn < 10) {
    if (gameBoard[0] === gameBoard[1] && gameBoard[1] === gameBoard[2]) {
      declareWinner(playerTurn % 2)
    } else if (gameBoard[3] === gameBoard[4] && gameBoard[4] === gameBoard[5]) {
      declareWinner(playerTurn % 2)
    } else if (gameBoard[6] === gameBoard[7] && gameBoard[7] === gameBoard[8]) {
      declareWinner(playerTurn % 2)
    } else if (gameBoard[0] === gameBoard[3] && gameBoard[3] === gameBoard[6]) {
      declareWinner(playerTurn % 2)
    } else if (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7]) {
      declareWinner(playerTurn % 2)
    } else if (gameBoard[2] === gameBoard[5] && gameBoard[5] === gameBoard[8]) {
      declareWinner(playerTurn % 2)
    } else if (gameBoard[0] === gameBoard[4] && gameBoard[4] === gameBoard[8]) {
      declareWinner(playerTurn % 2)
    } else if (gameBoard[2] === gameBoard[4] && gameBoard[4] === gameBoard[6]) {
      declareWinner(playerTurn % 2)
    } else if (playerTurn === 9) {
      declareWinner(2)
    }
  }
}

const declareWinner = (result) => {
  if (result === 1) {
    winnerAnnouncement.innerText = `Player 1 wins!!!`
    nextTurn.innerText = `Game Over`
    playerOneScoreNumber++
    playerOneScore.innerText = playerOneScoreNumber
  } else if (result === 0) {
    winnerAnnouncement.innerText = `${checkPlayerType()} wins!!!`
    nextTurn.innerText = `Game Over`
    playerTwoScoreNumber++
    playerTwoScore.innerText = playerTwoScoreNumber
  } else if (result === 2) {
    winnerAnnouncement.innerText = `It's a tie!!!`
    nextTurn.innerText = `Game Over`
    tieScoreNumber++
    tieScore.innerText = tieScoreNumber
  }

  gameDone = true
}

const resetGameBoard = () => {
  for (let i = 0; i < gameBoardBox.length; i++) {
    gameBoardBox[i].innerText = ''
  }

  for (let i = 0; i < gameBoard.length; i++) {
    gameBoard[i] = (i + 1) * 11
  }

  playerTurn = 1
  nextTurn.innerText = `Player 1 Turn`
  gameDone = false
  winnerAnnouncement.innerText = ``
}

const setGameMode = () => {
  resetGameBoard()
  playerOneScoreNumber = 0
  playerOneScore.innerText = playerOneScoreNumber
  playerTwoScoreNumber = 0
  playerTwoScore.innerText = playerTwoScoreNumber
  tieScoreNumber = 0
  tieScore.innerText = tieScoreNumber

  for (let i = 0; i < playerType.length; i++) {
    if (playerTypeNum === 0) {
      playerType[i].innerText = `Computer`
    } else if (playerTypeNum === 1) {
      playerType[i].innerText = `Player 2`
    }
  }

  if (playerTypeNum === 0) {
    playerTypeNum = 1
  } else if (playerTypeNum === 1) {
    playerTypeNum = 0
  }
}

const checkPlayerType = () => {
  if (playerTypeNum === 0) {
    return `Player 2`
  } else if (playerTypeNum === 1) {
    return `Computer`
  }
}

////////////////////////////////
// Event Listeners Here
for (let i = 0; i < gameBoardBox.length; i++) {
  gameBoardBox[i].addEventListener(`click`, () => {
    if (!gameDone) {
      if (gameBoard[i] !== 1 && gameBoard[i] !== 2) {
        setPlayerBox(i)
      }
    }
    if (playerTypeNum === 1 && !gameDone) {
      setTimeout(() => {
        setPlayerBox()
      }, `750`)
    }
  })
}

resetGame.addEventListener(`click`, resetGameBoard)

changeGameMode.addEventListener(`click`, setGameMode)

////////////////////////////////
