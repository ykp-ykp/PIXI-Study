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

    //创建一个容器
    const container = new PIXI.Container();
    app.stage.addChild(container);

    //  将精灵添加到容器中
    container.addChild(img);
    //图片的大小是400 x 400
    //所以初始化时容器的大小也是400x400
    //下面设置的position还是stage舞台上的点，并不是容器上的点
    img.position.set(container.width / 2, container.height / 2);

    //创建一个容器中点
    const graphics = new PIXI.Graphics();
    graphics.circle(0, 0, 3);
    graphics.fill("red");
    graphics.position.set(container.width / 2 - 50, container.height / 2 - 50);
    //容器的大小会随着其内部的元素撑开的面积变化，其自身并没有大小和高宽
    container.addChild(graphics);

    //  创建一个state中点
    const graphics2 = new PIXI.Graphics();
    graphics2.circle(0, 0, 50);
    graphics2.fill("yellow");
    graphics2.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(graphics2);
  }

  render() {
    return <div ref={this.containerRef}></div>;
  }
}
