import { Provider } from "react-redux";
import "./App.css";

import Layout from "./components/layout";
import store from "./redux/store";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Layout />
      </Provider>
      <ReactNotification />
    </div>
  );
}

export default App;
