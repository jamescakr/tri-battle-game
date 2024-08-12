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

  const play = (userChoice) => {
    setUserPick(choice[userChoice]);
  };
  return (
    <div>
      <div className="flex-box">
        <Box title="you" item={userPick} />
        {/* <Box title="computer" /> */}
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
