import "./App.css";
import Box from "./component/Box";
import React, { Component } from "react";
import BackgroundMusic from "./component/BackgroundMusic";

const choice = {
  archer: {
    name: "Archer",
    img: "/images/Archer.png",
  },
  catapult: {
    name: "Catapult",
    img: "/images/Catapult.png",
  },
  warrior: {
    name: "Warrior",
    img: "/images/Warrior.png",
  },
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPick: null,
      computerPick: null,
      userResult: "",
      computerResult: "",
      showBow: false,
      showResult: false,
    };
    this.flexBoxRef = React.createRef();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.showBox &&
      this.flexBoxRef.current &&
      prevState.showBox !== this.state.showBox
    ) {
      this.flexBoxRef.current.classList.add("flex-box");
    }
  }

  randomChoice = () => {
    let itemArray = Object.keys(choice);
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log(randomItem);
    let final = itemArray[randomItem];
    console.log("fff", final);
    return choice[final];
  };

  gamePlay = (userChoice) => {
    this.setState({
      userPick: choice[userChoice],
      computerPick: null,
      showResult: false,
    });

    setTimeout(() => {
      let computerChoice = this.randomChoice();
      let result = this.judge(choice[userChoice], computerChoice);

      this.setState({
        computerPick: computerChoice,
        userResult: result === "win" ? "win" : result === "lose" ? "lose" : "tie",
        computerResult:
          result === "win" ? "lose" : result === "lose" ? "win" : "tie",
        showResult: true,
      });
    }, 2000);
  };

  judge = (user, computer) => {
    console.log("user", user, "computer", computer);
    if (user.name === computer.name) return "tie";
    else if (user.name === "Archer")
      return computer.name === "Warrior" ? "win" : "lose";
    else if (user.name === "Catapult")
      return computer.name === "Archer" ? "win" : "lose";
    else if (user.name === "Warrior")
      return computer.name === "Catapult" ? "win" : "lose";
  };

  handleBackgroundAnimation = () => {
    this.setState({ showBox: true });
  };

  render() {
    return (
      <div>
        <BackgroundMusic onPlay={this.handleBackgroundAnimation} />
        {this.state.showBox && (
          <div className="flex-box" ref={this.flexBoxRef}>
            <Box
              title="you"
              item={this.state.userPick}
              result={this.state.userResult}
              showResult={this.state.showResult}
            />
            <Box
              title="computer"
              item={this.state.computerPick}
              result={this.state.computerResult}
              showResult={this.state.showResult}
            />
          </div>
        )}
        <div className="custom-button">
          <button onClick={() => this.gamePlay("archer")}>
            <img className="card-size" src="/images/Archer.png" alt="archer" />
          </button>
          <button onClick={() => this.gamePlay("catapult")}>
            <img className="card-size" src="/images/Catapult.png" alt="catapult" />
          </button>
          <button onClick={() => this.gamePlay("warrior")}>
            <img className="card-size" src="/images/Warrior.png" alt="warrior" />
          </button>
        </div>
        <div className="instruction-container">
          <img
            src="/images/writing-background.webp"
            className="instruction-background"
          />
          <div className="instruction-text">
            <ul>
              <li>
                &lt;<b>Archer</b>&gt; beats Warrior
              </li>
              <li className="spaced">
                &lt;<b>Warrior</b>&gt; beats Catapult
              </li>
              <li className="spaced">
                &lt;<b>Catapult</b>&gt; beats Archer
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
