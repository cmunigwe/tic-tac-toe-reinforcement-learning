class Game {
    constructor(){
      this.init()
    }
  
    /*--- Cached Element Referenes---*/
    elements = {
      message : document.getElementById('message'),
      cells : document.querySelectorAll('.cell'),
      reset_button: document.getElementById('reset_button')
    }
  
    state = {}
  
    setState = (obj) => {
      for ( const key in obj ) {
        this.state[key] = obj[key]
      }
    }
  
    init = () => {
      /*---Initial Game State---*/
      this.state = {
        board : Array.from(Array(9).keys()) ,
        //board: [0,0,0,0,0,0,0,0,0],
        isWinner: false,
        //playerSymbol : '🦶',
        //aiSymbol: '🍬',
        playerSymbol : '2',
        aiSymbol: '1',
        maximiser: true,
        messageText: `Pick a spot`,
        className: '',
      }
      for(var i = 0; i < 9; i++){
        this.elements.cells[i].innerText = ''
      }
      console.log(this.state.board)
      console.log(this.getHash())
      this.addEventListeners()
      this.render()
    }
  
  
    /*---Event Listeners---*/
    addEventListeners() {
      const{cells, resetButton} = this.elements
  
      const { choiceMade, init } = this
  
      cells[0].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(0));
      cells[1].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(1));
      cells[2].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(2));
      cells[3].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(3));
      cells[4].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(4));
      cells[5].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(5));
      cells[6].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(6));
      cells[7].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(7));
      cells[8].addEventListener('click', (event) => ((arg) => choiceMade(event, arg))(8));
  
      reset_button.addEventListener('click', init)
  
    }
  
    /*---Functions---*/
    choiceMade = (event, pos) => {
      event.preventDefault()
      const { isWinner } = this.state
      const { position } = this.elements
      console.log(pos)
      if ( isWinner ) return
      this.isFree(pos)
      console.log(this.getHash())
      this.render()
    }
  
    isFree = (pos) => {
      const { board, playerSymbol, aiSymbol, maximiser, isWinner} = this.state
      const {cells} = this.elements
      const { setState } = this
      if (typeof(board[pos])=== 'number'){
        board[pos] = playerSymbol
        cells[pos].innerText = playerSymbol
  
        setState({
          maximiser : false
        })
  
        if(this.checkForWinner(board, playerSymbol)){
          setState({
            isWinner : true,
            className : 'winner',
            messageText: 'You Won!'
          })
        }
        else{
          if (this.emptySquares().length !== 0){
            //let bestPos = this.bestSpot()
            //    chooseAction = (positions, current_board, symbol) =>{
            let bestPos = p1.chooseAction(this.emptySquares(), this.getHash(), '1' )
            board[bestPos] = aiSymbol
            cells[bestPos].innerText = aiSymbol
            setState({
              maximiser : true
            })
            if (this.checkForWinner(board, aiSymbol)){
              setState({
                className: 'loser',
                messageText: 'You lost :(',
                isWinner: true
              })
            }
          }
        }
      }
      else if (board[pos] == playerSymbol || board[pos] == aiSymbol){
        console.log("Illegal Move")
      }
  
      if (this.emptySquares().length === 0){
        setState({
          className: 'tie',
          messageText: "It's a tie",
          isWinner: true
        })
      }
      console.log(this.emptySquares().length)
      console.log(this.state.board)
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
        p1.feedReward(1)
        p2.feedReward(0)
      }  
      else if(this.isWinner(board, playerSymbol)){
        self.p1.feedReward(0)
        self.p2.feedReward(1)
      }      
      else{
        self.p1.feedReward(0.1)
        self.p2.feedReward(0.5)
      }      
    }
        
    
  
  
    emptySquares = () => {
      const { board, playerSymbol, aiSymbol, maximiser } = this.state
      const { setState } = this
  
      return board.filter(s => typeof s === 'number');
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
  
    render = () => {
      console.log("Rendering")
      const { message} = this.elements
      const {messageText, className} = this.state
      console.log(className)
      message.innerHTML = `
        <div class="${className}">
          ${messageText}
        </div>
      `
    }


  }
