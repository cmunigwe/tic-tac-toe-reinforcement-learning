import React, {Component} from 'react'
import './components/Board.css'

import Player from './Player'

class Game extends Component {
    constructor(){
        super()
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            board : Array.from(Array(9).keys()) ,
            boardRepresentation : Array(9).fill(''),
            isWinner: false,
            playerSymbol : '2',
            aiSymbol: '1',
            playerRepresentation : '🦶',
            aiRepresentation : '🍬',
            maximiser: true,
            messageText: `Pick a spot`,
            className: '',
        }
    }

    handleClick(i) {
       console.log(i)
       this.choiceMade(i)
       console.log(this.state.policy)
      }
  
    /*---Functions---*/
    choiceMade = (pos) => {
      const { isWinner } = this.state
      console.log(pos)
      if ( isWinner ) return
      this.isFree(pos)
      console.log(this.getHash())
      this.renderr()
      this.render()
    }
  
    isFree = (pos) => {
      const { board, playerSymbol, aiSymbol, maximiser, isWinner} = this.state
      if (typeof(board[pos])=== 'number'){
        board[pos] = playerSymbol
        this.state.boardRepresentation[pos] = this.state.playerRepresentation

        
        this.setState((state) => {return {
            currentSymbol : "lo",
            maximiser : false
        }}
        )
        /*

        this.setState({
          maximiser : false
        })
        */
        if(this.checkForWinner(board, playerSymbol)){
            /*
          this.setState({
            isWinner : true,
            className : 'winner',
            messageText: 'You Won!'
          })*/
          this.setState((state) => {return {
            isWinner : true,
            className : 'winner',
            messageText : 'You Won!'
        }}
        )
        }
        else{
          if (this.emptySquares().length !== 0){
            //let bestPos = this.bestSpot()
            //chooseAction = (positions, current_board, symbol) =>{
                console.log("EMPTYYYY")
                console.log(this.emptySquares())
            let bestPos = this.p1.chooseAction(this.emptySquares(), this.getHash(), '1' )
            //let bestPos = 4
            board[bestPos] = aiSymbol
            this.state.boardRepresentation[bestPos] = this.state.aiRepresentation
            //this.state.currentSymbol = "lo"
            this.setState((state) => {return {
                currentSymbol : "li",
                maximiser : true,
            }}
            )
            //cells[bestPos].innerText = aiSymbol
            /*
            this.setState({
              maximiser : true
            })
            */
            if (this.checkForWinner(board, aiSymbol)){
                /*
              this.setState({
                className: 'loser',
                messageText: 'You lost :(',
                isWinner: true
              })
              */
             this.setState((state) => {return {
                className : 'loser',
                messageText : 'You lost :(',
                isWinner: true
            }}
            )
            }
          }
        }
      }
      else if (board[pos] == playerSymbol || board[pos] == aiSymbol){
        console.log("Illegal Move")
      }
  
      if (this.emptySquares().length === 0){
        this.setState({
          className: 'tie',
          messageText: "It's a tie",
          isWinner: true
        })
      }
      console.log(this.emptySquares().length)
      console.log(this.state.board)

      this.renderr()
      this.render()

    }
  
    checkForWinner = (board, symbol) => {
      const { playerSymbol, aiSymbol } = this.state
  
      let symbols = [playerSymbol, aiSymbol]
      let noWinner = true
      let i = 0
      let j = 0
  
      let winningStates = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
  
      while (noWinner && j < 8){
        if (board[winningStates[j][0]] === symbol && board[winningStates[j][1]] === symbol && board[winningStates[j][2]] === symbol){
          noWinner = false
        }
        j+= 1
      }
  
      return !noWinner
    }
  
    
  
    bestSpot = () =>{
      const { board, playerSymbol, aiSymbol, maximiser } = this.state
      const { setState } = this
  
      var t = this.minimax(board, aiSymbol)
      return t.index
    }
  
    //get unique hash of current board state
    getHash = () => {
      const { board} = this.state
      let boardHash = ""
      for (var i = 0; i < board.length; i++){
        if (board[i] === '1'){
          boardHash += '1'
        }
        else if (board[i] === '2'){
          boardHash += '2'
        }
        else{
          boardHash += '0'
        }
      }
      return boardHash
    }
        
    //only when game ends
    
    giveReward = () =>{
      const {board, aiSymbol, playerSymbol} = this.state
      //backpropagate reward
      if (this.isWinner(board, aiSymbol)){
        this.p1.feedReward(1)
        this.p2.feedReward(0)
      }  
      else if(this.isWinner(board, playerSymbol)){
        this.p1.feedReward(0)
        this.p2.feedReward(1)
      }      
      else{
        this.p1.feedReward(0.1)
        this.p2.feedReward(0.5)
      }      
    }
        
    
  
  
    emptySquares = () => {
      const { board, playerSymbol, aiSymbol, maximiser } = this.state
      const { setState } = this
  
      return this.state.board.filter(s => typeof s === 'number');
      //return board.filter(s => s === 0)
    }
  
    minimax = (newBoard, player) => {
      const { board, playerSymbol, aiSymbol, maximiser } = this.state
      const { setState } = this
  
      var availSpots = this.emptySquares(newBoard)
  
      if(this.checkForWinner(newBoard, playerSymbol)){
        return {score : -10};
      }
      else if (this.checkForWinner(newBoard, aiSymbol)){
        return {score : 10}
      }
      else if (availSpots.length === 0){
        return {score : 0}
      }
  
      var moves = []
  
      for (var i = 0; i < availSpots.length; i++){
        var move = {}
        move.index = newBoard[availSpots[i]]
        newBoard[availSpots[i]] = player
  
        if(player === aiSymbol){
          var result = this.minimax(newBoard, playerSymbol)
          move.score = result.score
        }
        else{
          var result = this.minimax(newBoard, aiSymbol)
          move.score = result.score
        }
  
        newBoard[availSpots[i]] = move.index;
        moves.push(move)
      }
  
        var bestMove
  
        if(player === aiSymbol){
          var bestScore = -100000
  
          for(i = 0; i < moves.length; i++){
            if(moves[i].score > bestScore){
              bestScore = moves[i].score
              bestMove = i
            }
          }
        }else{
          var bestScore = 10000;
  
          for(i = 0; i < moves.length; i++){
            if(moves[i].score < bestScore){
              bestScore = moves[i].score
              bestMove = i
            }
          }
        }
        return moves[bestMove]
      }
    
      
    renderr = () => {
      console.log("Rendering")
      const {messageText, className} = this.state
      console.log(className)
      
      /*
      message.innerHTML = `
        <div class="${className}">
          ${messageText}
        </div>
      `
      */
    }

    reset = () =>{
        this.setState({
            currentSymbol : '5',
            board : Array.from(Array(9).keys()) ,
            boardRepresentation : Array(9).fill(''),
            //board : Array(9).fill(null),
        //board: [0,0,0,0,0,0,0,0,0],
        isWinner: false,
        //playerSymbol : '🦶',
        //aiSymbol: '🍬',
        playerSymbol : '2',
        aiSymbol: '1',
        playerRepresentation : '🦶',
        aiRepresentation : '🍬',
        //currentSymbol: '',
        maximiser: true,
        messageText: `Pick a spot`,
        className: '',
        cells: new Array(9)
          })
      console.log(this.state.board)
      console.log(this.getHash())
    }

    render() {
        console.log("Back here")
        var symbol = 0
        symbol += 1
        return(
            <>
<div className = "container_row">
    <h1> TicTacToe </h1>
    <h3 id = "message"> Pick a spot </h3>
    </div>
    <div className = "container_row">
    <table>
      <tr>
        <td className = "cell" id = "0" onClick={i =>this.handleClick(0)}>{this.state.boardRepresentation[0]}</td>
        <td className = "cell" id = "1" onClick={i =>this.handleClick(1)}>{this.state.boardRepresentation[1]}</td>
        <td className = "cell" id = "2" onClick={i =>this.handleClick(2)}>{this.state.boardRepresentation[2]}</td>
      </tr>
      <tr>
        <td className = "cell" id = "3" onClick={i =>this.handleClick(3)}>{this.state.boardRepresentation[3]}</td>
        <td className = "cell" id = "4" onClick={i =>this.handleClick(4)}>{this.state.boardRepresentation[4]}</td>
        <td className = "cell" id = "5" onClick={i =>this.handleClick(5)}>{this.state.boardRepresentation[5]}</td>
      </tr>
      <tr>
        <td className = "cell" id = "6" onClick={i =>this.handleClick(6)}>{this.state.boardRepresentation[6]}</td>
        <td className = "cell" id = "7" onClick={i =>this.handleClick(7)}>{this.state.boardRepresentation[7]}</td>
        <td className = "cell" id = "8" onClick={i =>this.handleClick(8)}>{this.state.boardRepresentation[8]}</td>
      </tr>
    </table>
    </div>
    <div className = "container_row" >
    <button id = "reset_button" onClick = {this.reset}> Reset</button>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js"></script>
  </>

        )
        
    }

     p1 = new Player("computer", 0.3)
     p2 = new Player("human")


  }
export default Game