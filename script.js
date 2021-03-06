  //import Game from './Game';

/*
fetch("http://localhost:3000")
  .then(function (response) {
    const jsondata = await response.json();
    return response.json();
  })
  .then(function (myJson) {
    console.log(myJson)
  })
  .catch(function (error) {
    console.log("Error: " + error);
  });

  console.log(jsondata)
  */
/*
let jsondata;    
fetch("http://localhost:3000",  {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'no-cors'}).then(
        function(u){ return u.json();}
      ).then(
        function(json){
          jsondata = json;
        }
      )
console.log("JSON")
console.log(jsondata)
*/

async function fetchMoviesJSON() {

  const response = await fetch('http://localhost:3000');
  const movies = await response.json();
  return movies;
}
let result 
fetchMoviesJSON().then(movies => {
  movies // fetched movies

 
  

  class Player {
    constructor(){
      this.init()
    }

    init = (name, exp_rate = 0.3) =>{
      this.state = {
        name: "AI player",
        states: [],
        lr : 0.2,
        exp_rate : 0.3,
        decay_gamma : 0.9,
        states_value : movies
      }
    }

    getHash = (board) => {
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
 

    chooseAction = (positions, current_board, symbol) =>{
      let action
      if (Math.random() <= self.exp_rate){
        //take random action
        let idx = Math.floor(Math.random() * Math.floor(positions.length))
        action = positions[idx]
      }
      
      else{
        let value_max = -999
        let value
        for (let p in positions){
          let next_board = [...current_board]
          next_board[p] = symbol
          let next_boardHash = this.getHash(next_board)
          if (this.state.states_value[next_board] === null){
            value = 0
          }
          else{
            this.state.states_value[next_boardHash]
          }
          console.log("value " + String(value))
          if (value >= value_max){
            value_max = value
            action = p
          }
                    
        }
               
      }
      console.log(this.state.name + " takes action " + String(action))

  
        return action
        
    }
        

    //append a hash state
    addState = (state) =>{
      this.state.states.append(state)
    }

    //at the end of game, backpropagate and update states value
    feedReward = (reward) =>{  
      for (st in this.state.states.reverse()){
        if (this.state.states_value[st] === null){
          this.state.states_value[st] = 0
        }
        this.self.states_value[st] += this.state.lr * (this.state.decay_gamma * reward - this.state.states_value[st])
        reward = this.self.states_value[st]
      }        
    }

    //Reset players states
    reset = () =>{
      this.state.states = []
    }
  }
  
  var newGame = require("./Game");

  /*
  var startGame =  new ss.A("2")
  p1 = new Player("computer", exp_rate = 0.3)
  p2 = new Player("human")
  new newGame.Game()
  */

  new Game()
  
});
