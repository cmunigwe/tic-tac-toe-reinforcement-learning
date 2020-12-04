import React, {Component} from 'react'
import './Board.css'
class Board extends Component {
  
    render() {
        return (
        <>
<div className = "container_row">
    <h1> TicTacToe </h1>
    <h3 id = "message"> Pick a spot </h3>
    </div>
    <div className = "container_row">
    <table>
      <tr>
        <td className = "cell" id = "0" onClick={this.handleClick}></td>
        <td className = "cell" id = "1"></td>
        <td className = "cell" id = "2"></td>
      </tr>
      <tr>
        <td className = "cell" id = "3"></td>
        <td className = "cell" id = "4"></td>
        <td className = "cell" id = "5"></td>
      </tr>
      <tr>
        <td className = "cell" id = "6"></td>
        <td className = "cell" id = "7"></td>
        <td className = "cell" id = "8"></td>
      </tr>
    </table>
    </div>
    <div className = "container_row" >
    <button id = "reset_button">Reset</button>
    </div>
    <script src="https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js"></script>
  </>
  )
    }

}

export default Board