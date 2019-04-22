import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./images/logo.gif";
import Colors from "./colors.json";
import Switch from "react-switch";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      codeType: "rgb"
    };
  }

  handleChange = () => {
    this.setState({ codeType: this.state.codeType === "hex" ? "rgb" : "hex" });
  };

  hexToRgb = hex => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
          result[3],
          16
        )})`
      : null;
  };

  clickToCopy = (color, id) => {
    const el = document.createElement("textarea");
    el.value = color;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    document.querySelector("#" + id).textContent = "Copied!";
    setTimeout(() => {
      document.querySelector("#" + id).textContent = color;
    }, 1500);
  };

  render() {
    console.log(Colors);
    return (
      <div className="app">
        <section className="header">
          <div className="title">
            <img src={logo} alt="logo" />
            <span style={{ marginLeft: 10 }}> L2C Color Picker</span>
          </div>
          <div className="sub-title">
            Click to Copy Color
            <div className="toggle">
              <span>RGB</span>
              <Switch
                onChange={this.handleChange}
                uncheckedIcon={false}
                checkedIcon={false}
                checked={this.state.codeType === "hex"}
              />
              <span>HEX</span>
            </div>
          </div>
        </section>
        <section className="body">
          {Colors.map((group, index) => (
            <div className="colorsGroup" key={index}>
              <div className="title">{group.title}</div>
              <div className="colorsGrid">
                {group.colors.map((color, colorIndex) => {
                  color =
                    this.state.codeType === "rgb"
                      ? this.hexToRgb(color)
                      : color;
                  return (
                    <div
                      className="color"
                      key={colorIndex}
                      id={"color" + index + "" + colorIndex}
                      style={{ backgroundColor: color }}
                      onClick={() =>
                        this.clickToCopy(
                          color,
                          "color" + index + "" + colorIndex
                        )}
                    >
                      {color}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </section>
        <section className="footer">
          <p>
            Clone of
            <a href="https://uicolorpicker.com/"> UI Color Picker </a>
            <br />
            <span>Inspired by Hitesh Choudhary</span>
          </p>
          <p>Live2Code</p>
        </section>
      </div>
    );
  }
}

export default App;
