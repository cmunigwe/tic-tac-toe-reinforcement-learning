class Player{
    constructor(){
      
      async function fetchPolicyJSON() {
        const response = await fetch('http://localhost:3000');
        const policy = await response.json();
        return policy;
      }
      fetchPolicyJSON().then(policy => {
        this.state = {
            name: "AI player",
            states: [],
            lr : 0.2,
            exp_rate : 0.3,
            decay_gamma : 0.9,
            states_value : policy
          }
        //{this.setState({states_value : policy})}
      });
    }

    componentDidMount(){
        async function fetchPolicyJSON() {
            const response = await fetch('http://localhost:3000');
            const policy = await response.json();
            return policy;
          }
          fetchPolicyJSON().then(policy => {
            {this.setState({states_value : policy})}
          });  
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
      

      if (Math.random() <= this.exp_rate){
        //take random action
        let idx = Math.floor(Math.random() * Math.floor(positions.length))
        action = positions[idx]
      }
      else{
        console.log("DH*UHIOHN")
        console.log(positions)
        let value_max = -999
        let value
        for (let p in positions){
            console.log("PSSSS")
            console.log(positions[p])
          let next_board = [...current_board]
          next_board[positions[p]] = symbol
          let next_boardHash = this.getHash(next_board)
          if (this.state.states_value[next_board] === null){
            value = 0
          }
          else{
            value = this.state.states_value[next_boardHash]
          }
          console.log("value " + String(value))
          if (value >= value_max){
            value_max = value
            action = positions[p]
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
      for (let st in this.state.states.reverse()){
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

  export default Player