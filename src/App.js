import "./App.css";
import Box from "./component/Box";
import { useState } from "react";

//1. 박스2개 (타이틀, 사진, 결과값)
//2. 가위 바위 보 버튼
//3. 버튼클릭 >> 클릭한 버튼이 화면에 보임
//4. 컴퓨터 >> 랜덤선택
//5. 3,4번의 결과로 승패를 따짐 (win, lose)
//6. 승패결과에 따라 테두리 색깔이 바뀜(red, green black)

const choice = {
  rock: {
    name: "Rock",
    img: "https://m.media-amazon.com/images/I/51rOMX5z40L.jpg",
  },
  scissors: {
    name: "Scissors",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-S9fVPSeA28SJexVubODPSkYPbaGlHh_Y2g&s",
  },
  paper: {
    name: "Paper",
    img: "https://static.vecteezy.com/system/resources/thumbnails/012/981/791/small_2x/old-parchment-paper-sheet-vintage-aged-or-texture-background-png.png",
  },
};

function App() {
  const [userPick, setUserPick] = useState(null);
  const [computerPick, setComputerPick] = useState(null);
  const [userResult, setUserResult] = useState(""); //결과값을 user 랑 computer랑 따로 보여주게끔 useState를 설정
  const [computerResult, setComputerResult] = useState("");

  const randomChoice = () => {
    let itemArray = Object.keys(choice);
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log(randomItem);
    let final = itemArray[randomItem];
    console.log("fff", final);
    return choice[final];
  };

  const play = (userChoice) => {
    setUserPick(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerPick(computerChoice);
    let result = judge(choice[userChoice], computerChoice); //judge의 결과값을 result에 저장 후

    //
    setUserResult(
      //저장한 result값을 이용하여 삼항연산식 이용 (삼항연산식 안의 삼항연산식 - 복잡해보이지만 이해하면 쉬움)
      result === "win" ? "win" : result === "lose" ? "lose" : "tie"
    );
    setComputerResult(
      result === "win" ? "lose" : result === "lose" ? "win" : "tie"
    );
  };

  const judge = (user, computer) => {
    console.log("user", user, "computer", computer);
    //가위바위보 로직
    //1. 가위>>보>>바위>>가위
    //2. 유저: 가위 일때, 컴: 보 면 >> 유저 승 ++ 컴: 바위 면 >> 컴 승
    //3. 유저: 바위 일때, 컴: 가위 면 >> 유저 승 ++ 컴: 보 면 >> 컴 승
    //4. 유저: 보 일때, 컴 : 바위 면 >> 유저 승 ++ 컴: 가위 면 >> 컴 승
    if (user.name === computer.name) return "tie";
    else if (user.name === "Scissors")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Rock")
      return computer.name === "Paper" ? "win" : "lose";
    else if (user.name === "Paper")
      return computer.name === "Rock" ? "win" : "lose";
  };

  return (
    <div>
      <div className="flex-box">
        <Box title="you" item={userPick} result={userResult} />
        <Box title="computer" item={computerPick} result={computerResult} />
      </div>
      <div className="custom-button">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;
