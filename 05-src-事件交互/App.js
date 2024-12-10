import React, { Component } from "react";
import * as PIXI from "pixi.js";

export default class App extends Component {
  containerRef = React.createRef();
  async componentDidMount() {
    const app = new PIXI.Application();
    await app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
    });
    this.containerRef.current.appendChild(app.canvas);
    const texture = await PIXI.Assets.load("images/testpovit-anchor2.jpg");
    const img = PIXI.Sprite.from(texture);
    let initX = app.screen.width / 2;
    let initY = app.screen.height / 2;
    img.position.set(initX, initY);
    img.anchor.set(0.5);
    img.alpha = 0.5;
    app.stage.addChild(img);

    const callback = (time) => {
      img.rotation += time.deltaTime * 0.01;
    };
    app.ticker.add(callback);

    //给精灵添加事件
    let isDraging = false;
    img.eventMode = "static";
    img.on("mouseenter", () => {
      img.alpha = 1;
      app.ticker.remove(callback);
    });
    img.on("mouseleave", () => {
      img.alpha = 0.5;
      app.ticker.add(callback);
    });
    img.on("mousedown", () => {
      isDraging = true;
    });
    img.on("mouseup", () => {
      isDraging = false;
    });
    img.on("mousemove", (e) => {
      if (!isDraging) return;
      const { movementX, movementY } = e;
      initX += movementX;
      initY += movementY;
      img.position.set(initX, initY);
    });
  }

  render() {
    return <div ref={this.containerRef}></div>;
  }
}
