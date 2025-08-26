import "./App.css";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TodoDetail from "./components/TodoDetail";
import NotFound from "./components/NotFound";
import Testpage from "./components/TestPage";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorBoundary";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/task/:id" element={<TodoDetail/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="test-error" element={<Testpage/>} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
