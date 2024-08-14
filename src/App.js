import "./App.css";
import Box from "./component/Box";
import { useState, useRef, useEffect } from "react";
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

function App() {
  const [userPick, setUserPick] = useState(null);
  const [computerPick, setComputerPick] = useState(null);
  const [userResult, setUserResult] = useState(""); //결과값을 user 랑 computer랑 따로 보여주게끔 useState를 설정
  const [computerResult, setComputerResult] = useState("");
  const [showBox, setShowBox] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const flexBoxRef = useRef(null);

  useEffect(() => {
    if (showBox && flexBoxRef.current) {
      flexBoxRef.current.classList.add("flex-box");
    }
  }, [showBox]);

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log(randomItem);
    let final = itemArray[randomItem];
    console.log("fff", final);
    return choice[final];
  };

  const gamePlay = (userChoice) => {
    setUserPick(choice[userChoice]);
    setComputerPick(null);
    setShowResult(false);

    setTimeout(() => {
      let computerChoice = randomChoice();
      setComputerPick(computerChoice);

      let result = judge(choice[userChoice], computerChoice); //judge의 결과값을 result에 저장 후

      //저장한 result값을 이용하여 삼항연산식 이용 (삼항연산식 안의 삼항연산식 - 복잡해보이지만 이해하면 쉬움)
      setUserResult(result === "win" ? "win" : result === "lose" ? "lose" : "tie");
      setComputerResult(
        result === "win" ? "lose" : result === "lose" ? "win" : "tie"
      );
      setShowResult(true);
    }, 2000);
  };

  const judge = (user, computer) => {
    console.log("user", user, "computer", computer);
    if (user.name === computer.name) return "tie";
    else if (user.name === "Archer")
      return computer.name === "Warrior" ? "win" : "lose";
    else if (user.name === "Catapult")
      return computer.name === "Archer" ? "win" : "lose";
    else if (user.name === "Warrior")
      return computer.name === "Catapult" ? "win" : "lose";
  };

  const handleBackgroundAnimation = () => {
    setShowBox(true);
  };

  return (
    <div>
      <BackgroundMusic onPlay={handleBackgroundAnimation} />
      {showBox && ( //조건부 렌더링 >> showBox가 참일때만 뒤의 (괄호)의 코드가 보여진다
        <div className="flex-box" ref={flexBoxRef}>
          <Box
            title="you"
            item={userPick}
            result={userResult}
            showResult={showResult}
          />
          <Box
            title="computer"
            item={computerPick}
            result={computerResult}
            showResult={showResult}
          />
        </div>
      )}
      <div className="custom-button">
        <button onClick={() => gamePlay("archer")}>
          <img className="card-size" src="/images/Archer.png" alt="archer" />
        </button>
        <button onClick={() => gamePlay("catapult")}>
          <img className="card-size" src="/images/Catapult.png" alt="catapult" />
        </button>
        <button onClick={() => gamePlay("warrior")}>
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

export default App;
