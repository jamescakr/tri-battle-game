import "./App.css";
import Box from "./component/Box";
import React, { Component } from "react";
import BackgroundMusic from "./component/BackgroundMusic";

//가위바위보 >> 카드게임으로 전환 플랜
//1. 가위:궁수, 바위:투석기, 보:전사
//1-1 궁수(가위): 장거리 공격이 가능하여 멀리서 오는 전사를 쉽게 처리할수있음, 기동력이 낮아 투석기 공격에 취약
//1-2 투석기(바위): 공격력이 높고 장거리 공격이 가능하여 기동력이 낮은 궁수를 쉽게 처리할수있음, 이동이 불가하여 기동력이 높은 전사에게 취약
//1-3 전사(보): 기동력이 높아 투석기 공격을 회피할수있고 쉽게 접근가능하여 투석기를 쉽게 처리할수있음, 근접공격만 가능하여 궁수에게 취약
//2. 위쳐3의 궨트 카드게임을 응용 - 궨트 카드로 이미지파일
//3. bgm + 효과음 넣기
//4. CSS 애니메이션을 통해 효과 주기 (클릭후 애니메이션 재생 >> 3~4초 딜레이후 결과 나타내기)

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
            <div>
              &lt;<b>가위 궁수</b>&gt;
            </div>
            <div>
              장거리 공격이 가능하여 멀리서 오는 <b>보 전사를 쉽게 제압가능</b> //
              기동력이 낮아 <b>투석기 공격에 취약</b>
            </div>
            <div className="spaced">
              &lt;<b>바위 투석기</b>&gt;
              <div>
                공격력이 높고 장거리 공격이 가능하여 기동력이 낮은
                <b>가위 궁수를 쉽게 제압가능</b> // 이동이 불가하여 기동력이 높은{" "}
                <b>보 전사에게 취약</b>
              </div>
            </div>
            <div className="spaced">
              &lt;<b>보 전사</b>&gt;
              <div>
                기동력이 높아 쉽게 접근가능하여
                <b>투석기를 쉽게 제압가능</b>, 근접공격만 가능하여{" "}
                <b>가위 궁수에게 취약</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
