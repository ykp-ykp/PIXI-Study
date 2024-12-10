import React, { Component } from "react";
import * as PIXI from "pixi.js";

export default class App extends Component {
  app = new PIXI.Application();
  isDrawing = false;
  lastx = 0;
  lasty = 0;
  rectangle = null;

  async componentDidMount() {
    await this.app.init({
      width: 600,
      height: 600,
      backgroundColor: 0x1099bb,
    });

    this.app.canvas.addEventListener("mousedown", this.mouseDown);
    this.app.canvas.addEventListener("mousemove", this.mouseMove);
    this.app.canvas.addEventListener("mouseup", this.mouseUp);
    this.app.canvas.addEventListener("mouseleave", this.mouseLeave);
    document.body.appendChild(this.app.canvas);
  }

  mouseDown = (e) => {
    this.rectangle = new PIXI.Graphics();
    console.log("mousedown");
    this.isDrawing = true;
    this.lastx = e.clientX;
    this.lasty = e.clientY;
    console.log(`(${this.lastx},${this.lasty})`);
  };

  mouseMove = (e) => {
    if (!this.isDrawing) return;
    console.log("mousemove");
    console.log(this.app);
    this.rectangle.clear();
    this.rectangle.rect(
      this.lastx,
      this.lasty,
      e.clientX - this.lastx,
      e.clientY - this.lasty
    );
    this.rectangle.fill("red");
    this.app.stage.addChild(this.rectangle);
  };

  mouseUp = (e) => {
    console.log("mouseup");
    this.isDrawing = false;
  };

  mouseLeave = (e) => {
    this.isDrawing = false;
  };

  render() {
    return null;
  }
}
