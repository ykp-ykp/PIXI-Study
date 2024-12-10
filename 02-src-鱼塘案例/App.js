import * as PIXI from "pixi.js";
import React, { Component } from "react";

export default class App extends Component {
  divRef = React.createRef();

  async componentDidMount() {
    const app = new PIXI.Application();
    await app.init({
      width: window.innerWidth,
      heigth: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });
    // globalThis.__PIXI_APP__ = app;
    this.divRef.current.appendChild(app.canvas);

    // this.renderBunny(app);
    this.renderFishPond(app);
  }

  async renderBunny(app) {
    const texture = await PIXI.Assets.load("images/bunny.png");
    const bunny = new PIXI.Sprite(texture);

    app.stage.addChild(bunny);

    //设置锚点，使其位于中心
    //锚点是相对于sprint自身位置而言的，0.5表示自己的中心位置，后续设置sprint的x和y坐标时，被设置的坐标就是锚点的位置。
    bunny.anchor.set(0.5);
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;

    app.ticker.add((time) => {
      bunny.rotation += 0.1 * time.deltaTime;
    });
  }

  async renderFishPond(app) {
    //  首先加载图片资源
    await this.preLoadImage();
    //  创建和设置背景精灵
    const background = PIXI.Sprite.from("background");
    //  设置背景图片的锚点
    background.anchor.set(0.5);
    //  将精灵添加到舞台
    app.stage.addChild(background);
    //  缩放背景图片
    this.scaleBacnground(app, background);

    //  设置背景图片到中心位置
    background.x = app.screen.width / 2;
    background.y = app.screen.height / 2;

    this.addFishes(app);
    this.addWater(app);
  }

  async preLoadImage() {
    const assets = [
      {
        alias: "background",
        src: "images/pond_background.jpg",
      },
      {
        alias: "fish1",
        src: "images/fish1.png",
      },
      {
        alias: "fish2",
        src: "images/fish2.png",
      },
      {
        alias: "fish3",
        src: "images/fish3.png",
      },
      {
        alias: "fish4",
        src: "images/fish4.png",
      },
      {
        alias: "fish5",
        src: "images/fish5.png",
      },
      {
        alias: "overlay",
        src: "images/wave_overlay.png",
      },
      {
        alias: "displacement",
        src: "images/displacement_map.png",
      },
    ];
    await PIXI.Assets.load(assets);
  }

  scaleBacnground(app, background) {
    if (app.screen.width > app.screen.height) {
      background.width = app.screen.width * 1.1;
      background.scale.y = background.scale.x;
    } else {
      background.height = app.screen.height * 1.1;
      background.scale.x = background.scale.y;
    }
    console.log(app);
    console.log(background);
  }

  addFishes(app) {
    const fishConrainer = new PIXI.Container();
    app.stage.addChild(fishConrainer);

    //  声明鱼的数量和鱼资源
    const fishCount = 20;
    const fishAssets = ["fish1", "fish2", "fish3", "fish4", "fish5"];
    let fishes = [];
    //  循环创建每条鱼
    for (let i = 0; i < fishCount; i++) {
      const fish = PIXI.Sprite.from(fishAssets[i % 5]);
      fish.anchor.set(0.5);
      //  添加每个鱼的一些自定义属性,方便后续更新
      fish.direction = Math.random() * Math.PI * 2; //朝向
      fish.speed = 2 + Math.random() * 2; //速度
      fish.turnSpeed = Math.random() - 0.8; //转弯速度

      fish.x = Math.random() * app.screen.width;
      fish.y = Math.random() * app.screen.height;

      fish.scale.set(0.3 + Math.random() * 0.2);
      fishConrainer.addChild(fish);
      fishes.push(fish);
    }

    this.animateFishes(app, fishes);
  }

  animateFishes(app, fishes) {
    app.ticker.add((time) => {
      const stagePadding = 100;
      const boundWidth = app.screen.width + stagePadding * 2;
      const boundHeight = app.screen.height + stagePadding * 2;
      fishes.forEach((fish) => {
        fish.direction += fish.turnSpeed * 0.01;
        fish.x += Math.sin(fish.direction) * fish.speed;
        fish.y += Math.cos(fish.direction) * fish.speed;
        fish.rotation = -fish.direction - Math.PI / 2;

        //  判断鱼是否离开容器,更新位置
        if (fish.x < -stagePadding) {
          fish.x += boundWidth;
        }
        if (fish.x > app.screen.width + stagePadding) {
          fish.x -= boundWidth;
        }
        if (fish.y < -stagePadding) {
          fish.y += boundHeight;
        }
        if (fish.y > app.screen.height + stagePadding) {
          fish.y -= boundHeight;
        }
      });
    });
  }

  addWater(app) {
    const texture = PIXI.Texture.from("overlay");

    const overlay = new PIXI.TilingSprite({
      texture,
      width: app.screen.width,
      height: app.screen.height,
    });
    app.stage.addChild(overlay);
    let elapsed = 0;
    app.ticker.add((time) => {
      elapsed += time.deltaTime;
      overlay.tilePosition.x = elapsed * -1;
      overlay.tilePosition.y = elapsed * -1;
    });
  }

  render() {
    return <div className="App" ref={this.divRef}></div>;
  }
}
