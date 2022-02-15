import * as React from "react";
import * as ReactDOM from "react-dom";
import { Footer } from "./footer";
import { Header } from "./header/header";
import store, { RootState } from "./store";
import { Provider, useSelector } from "react-redux";
import { InitIPCController } from "./ipc-controller";
import { useAppSelector } from "./hooks";
import { TabsBlock } from "./tabs-block";
import { TabSelector } from "./tabs-selector";
import { AvailableTabs } from "./slices/tabs.slice";

function App() {
  const selectedTab = useSelector<RootState, AvailableTabs>(
    (state) => state.tabs.selectedTab
  );
  const structure = useAppSelector((state) => state.structure.structure);

  if (!structure) {
    return <>adsa</>;
  }

  return (
    <>
      <Header />
      <TabSelector />
      <TabsBlock selectedTab={selectedTab} />
      <Footer />
    </>
  );
}

function ZeroApp() {
  return (
    <Provider store={store}>
      <App />
      <InitIPCController />
    </Provider>
  );
}

function render() {
  ReactDOM.render(<ZeroApp />, document.body);
}

render();
