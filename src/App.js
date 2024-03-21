import { TodoList } from "./components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TodoList />} />
      </Routes>
    </div>
  );
};

export default App;
