import { Provider } from "react-redux";
import "./App.css";

import Layout from "./components/layout";
import store from "./redux/store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Layout />
      </Provider>
    </div>
  );
}

export default App;
