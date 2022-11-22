import "./style/app.css";
import SecondPart from "./components/SecondPart";
import FirstPart from "./components/firstPart";
import ThirdPart from "./components/thirdPart";
import LastPart from "./components/lastPart";
import { useMediaQuery } from "react-responsive";

function App() {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  return (
    <div className="App">
      {isDesktopOrLaptop && (
        <div className="splitScreen">
          <div className="topPane">
            <FirstPart />
          </div>
          <div className="secondPane">
            <SecondPart />
          </div>
          <div className="middlePane">
            <LastPart />
            <ThirdPart />
          </div>
        </div>
      )}
      {isTabletOrMobile && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FirstPart />
          <LastPart />
          <SecondPart />
          <ThirdPart />
        </div>
      )}
    </div>
  );
}

export default App;
