import React, { Component } from "react";
import * as PIXI from "pixi.js";

export default class App extends Component {
  containerRef = React.createRef();
  async componentDidMount() {
    const app = new PIXI.Application();
    await app.init({
      width: 600,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    this.containerRef.current.appendChild(app.canvas);

    const graphics = new PIXI.Graphics();
    app.stage.addChild(graphics);

    //  画一个矩形,不带边框
    graphics.rect(10, 30, 50, 50);
    graphics.fill("red");

    //  画一个矩形,带边框
    graphics.rect(70, 30, 50, 50);
    graphics.fill("red");
    graphics.stroke({ width: 2, color: "white" });

    //  画一个圆
    graphics.circle(180, 60, 50); //x,y,半径
    graphics.fill({ color: "red" });
    graphics.stroke({ width: 2, color: "white" }); //对路径进行描边

    //  画一个三角形
    graphics.beginPath(); // 告诉canvas重新开始了一条路径
    graphics.moveTo(240, 40); //三角形的第一个起点
    graphics.lineTo(320, 40); //三角形的第二个点（形成第一条边）
    graphics.lineTo(280, 80); //三角形的第三个点（形成第二条边）
    graphics.lineTo(240, 40); //回归到三角形第的一个起点（形成第三条边，刚好闭合）
    graphics.closePath(); //告诉canvas本次绘制结束，并且会自动将终点和起点相连（beginPath和closePath也可以忽略不写）
    graphics.fill("red");
    graphics.stroke({ width: 2, color: "white" });

    //  画一个三角形
    graphics.moveTo(350, 40); //三角形的第一个起点
    graphics.lineTo(440, 40); //三角形的第二个点（形成第一条边）
    graphics.lineTo(380, 80); //三角形的第三个点（形成第二条边）
    graphics.fill("red"); //在使用fill填充时，如果路径没有形成闭合区域，canvas会自动将终点和起点“相连”，并填充该闭合区域
    graphics.stroke({ width: 2, color: "white" }); //但是由于没有画第三条边，因此再描边的时候只有两条边存在

    //  画一个圆角矩阵
    graphics.roundRect(10, 100, 60, 100, 30); //x,y,宽，高，半径（也可以利用这个半径和宽高之间的关系画园）
    graphics.fill("red");

    //  画一个多角星星
    graphics.star(130, 150, 5, 50); //x，y，角的数量，边长
    graphics.fill("red");
    graphics.circle(130, 150, 2); //画一个五角星的中心点
    graphics.fill("white");

    //  画一个多边形
    graphics.poly([300, 300, 350, 300, 350, 400, 250, 400], false); // 第一个参数为坐标数组，分表表示lineTo的位置，第二个参数为是否闭合终点和起点
    graphics.fill("red");
    graphics.stroke({ width: 2, color: "white" });
    console.log(app.view)
    console.log(app.canvas)
    console.log(app.canvas === app.view)
  }
  render() {
    return <div ref={this.containerRef}>App</div>;
  }
}
