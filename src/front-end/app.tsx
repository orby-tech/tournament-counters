import { Box, Tab, Tabs } from "@material-ui/core";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BaseInfoBody } from "./base-info/base-info-body";
import { CommandsEditor } from "./commands-editor";
import { CounterBody } from "./counter-body/counter-body";
import { Footer } from "./footer";
import { Header } from "./header/header";
import store from "./store";
import { Provider } from "react-redux";
import { InitIPCController } from "./ipc-controller";
import { useAppSelector } from "./hooks";

class App extends React.Component {
  state = {
    selectedTab: 0,
  };

  constructor(props: Record<string, never>) {
    super(props);
    this.setSelectedTab = this.setSelectedTab.bind(this);
  }

  setSelectedTab(event: any, newValue: number) {
    this.setState({ selectedTab: newValue });
  }

  render() {
    return (
      <>
        <Header />
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={this.state.selectedTab}
            onChange={this.setSelectedTab}
            aria-label="basic tabs example"
          >
            <Tab label="Основная информация" />
            <Tab label="Команды" />
            <Tab label="Информация о туре" />
          </Tabs>
        </Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <div hidden={this.state.selectedTab !== 0}>
            <BaseInfoBody />
          </div>
          <div hidden={this.state.selectedTab !== 1}>
            <CommandsEditor />
          </div>
          <div hidden={this.state.selectedTab !== 2}>
            <CounterBody />
          </div>
        </Box>{" "}
        <Footer />
      </>
    );
  }
}

function ShowApp() {
  const structure = useAppSelector((state) => state.structure.structure);
  if (!structure) {
    return <>adsa</>;
  }
  return <App />;
}

function ZeroApp() {
  return (
    <Provider store={store}>
      <ShowApp />
      <InitIPCController />
    </Provider>
  );
}

function render() {
  ReactDOM.render(<ZeroApp />, document.body);
}

render();
