import React, { Component } from "react";
import "./App.css";
import { SplitButton, MenuItem } from "react-bootstrap";
import Grid from "./components/grid";
//import MoveAble from "./components/MoveAble";
import Box from "./components/Box"

class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Boot />
        </div>
        <div>
          <Box />
        </div>
        <div>
          <Grid />
        </div>
      </div>
    );
  }
}

class Boot extends Component {
  state = { theme: null };

  chooseTheme = (theme, evt) => {
    evt.preventDefault();
    if (theme.toLowerCase() === "reset") {
      theme = null;
    }
    this.setState({ theme });
  };
  render() {
    const { theme } = this.state;
    const themeClass = theme ? theme.toLowerCase() : "default";

    const parentContainerStyles = {
      position: "absolute",
      height: "100%",
      width: "100%",
      display: "table"
    };

    const subContainerStyles = {
      position: "relative",
      height: "100%",
      width: "100%",
      display: "table-cell",
      verticalAlign: "middle"
    };
    return (
      <div style={parentContainerStyles}>
        <div style={subContainerStyles}>
          <span
            className={`h1 center-block text-center text-${
              theme ? themeClass : "muted"
            }`}
            style={{ marginBottom: 25 }}
          >
            {theme || "Default"}
          </span>

          <div className="center-block text-center">
            <SplitButton
              bsSize="large"
              bsStyle={themeClass}
              title={`${theme || "Default"} Theme`}
            >
              <MenuItem eventKey="Primary" onSelect={this.chooseTheme}>
                Primary Theme
              </MenuItem>
              <MenuItem eventKey="Danger" onSelect={this.chooseTheme}>
                Danger Theme
              </MenuItem>
              <MenuItem eventKey="Success" onSelect={this.chooseTheme}>
                Success Theme
              </MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="Reset" onSelect={this.chooseTheme}>
                Default Theme
              </MenuItem>
            </SplitButton>
          </div>
        </div>
      </div>
    );
  }
}



export default App;
