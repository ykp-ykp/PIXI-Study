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
    //1：position的效果和作用
    // this.position(img, app);
    //2：pivot的效果和作用
    // this.pivot(img, app);
    //3：anchor的效果和作用
    this.anchor(img, app);

    //在屏幕中间画一个原点，供参考
    const graphics = new PIXI.Graphics();
    graphics.circle(0, 0, 5); //这里的x和y是相对于graphics对象的左上角而言的，并不是app对象
    graphics.fill({ width: 2, color: "black" });
    //  设置graphics对象左上角坐标位于父容器的中间
    graphics.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(graphics);
  }

  position(sprite, app) {
    /* 
      position设置精灵原点的位置在父容器的哪里，position(10,10)的意思是
      设置精灵的原点位于父容器（10，10）处，默认就是精灵左上角位于父元素（10，10）处
    */
    //设置精灵对象的起始坐标（精灵左上角）调整到父元素的中间位置。
    //上面精灵对象的起始坐标更准确可以理解为精灵原点，其原点默认为对象本身左上角位置，即（0，0）
    sprite.position.set(app.screen.width / 2, app.screen.height / 2);
    app.stage.addChild(sprite);
    //position的意思是sprite对象的起始坐标位于父容器的那个位置。
  }

  pivot(sprite, app) {
    /* 
    首先说一说pivot，用通俗的话来说就是，选择sprite(精灵)上的哪个点来当作原点。
    之后关于sprite的旋转，缩放之类的操作都会以该点为圆心。并且position设置的
    坐标位置也是精灵原点所在位置。
    */
    sprite.position.set(app.screen.width / 2, app.screen.height / 2);
    /*sprite对象的原点默认为该对象的左上角（0，0），通过下面的设置可以将sprite对象的原点位置
    设置为（100，100），所以该对象的原点（100，100）会处于上面设置的父容器坐标上（屏幕中间）。
    */
    sprite.pivot.set(100, 100);
    app.stage.addChild(sprite);
  }

  anchor(sprite, app) {
    /* 
      anchor的作用和pivot一样，只不过anchor的值是一个0-1之间的数字，表示精灵宽高的比例，
      例如anchor.set(0.5)表示将sprite精灵自身宽高的1/2处设置为精灵的原点。
    */
    sprite.position.set(app.screen.width / 2, app.screen.height / 2);
    sprite.anchor.set(0.25);
    //  旋转的时候也是以原点为中心
    sprite.rotation = Math.PI / 4;
    //  缩放也是
    // sprite.scale = 0.5;

    app.stage.addChild(sprite);
  }

  render() {
    return <div ref={this.containerRef}></div>;
  }
}
