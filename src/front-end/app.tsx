import * as React from "react";
import * as ReactDOM from "react-dom";
import { Footer } from "./components/footer";
import { Header } from "./components/header/header";
import store from "./store/store";
import { Provider } from "react-redux";
import { InitIPCController } from "./ipc-controller";
import { useAppSelector } from "./hooks";
import { TabsBlock } from "./components/tabs-block";
import { TabSelector } from "./components/tabs-selector";
import { LoadingPage } from "./components/loading-page";
import { Toaster } from "react-hot-toast";

function App() {
  const structure = useAppSelector((state) => state.structure.structure);

  if (!structure) {
    return <LoadingPage />;
  }

  return (
    <>
      <Header />
      <TabSelector />
      <TabsBlock />
      <Footer />
    </>
  );
}

function ZeroApp() {
  return (
    <Provider store={store}>
      <App />
      <InitIPCController />
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  );
}

function render() {
  ReactDOM.render(<ZeroApp />, document.body);
}

render();
