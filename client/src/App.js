import Home from "./pages/home";
import Sign from "./pages/sign";
import { Provider } from "react-redux";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import store from "./redex-setup/store";

const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
        <Routes>
          <Route path="/home/*" element={<Home/>}/>
          <Route path="/" element={<Sign/>}/>
        </Routes>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
