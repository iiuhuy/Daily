import React from "react";
import BaseUse from "./components/baseUse";
import AdvancedUse from "./components/advancedUse";
import ReduxUse from "./components/reduxUse";
import TodoList from "./components/TodoLIst";

function App() {
  const titleStyle = { color: "red" };
  return (
    <div>
      <h1 style={titleStyle}>BaseUse</h1>
      <BaseUse />
      <hr />
      <h1 style={titleStyle}>AdvancedUse</h1>
      <AdvancedUse />
      <hr />
      <h1 style={titleStyle}>ReduxUse</h1>
      <ReduxUse />
      <hr />
      <h1 style={titleStyle}>TodoList</h1>
      <TodoList />
      <hr />
    </div>
  );
}

export default App;
