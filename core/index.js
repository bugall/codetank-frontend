"use strict";
var Tank = require('./src/tank');
//init params
var opts = {
    bulletAmount: 10,
    speed: 5,
    mapSize: {
        x: 10,
        y: 10
    },
    maxStepLength: 1
};
var Tanks = new Tank.Tank(opts);
Tanks.test(); //测试模拟数据；
console.log(Tanks);
setInterval(test, 1000);
function test() {
    var position = Tanks.getTankPosition(); // 获取自己坦克的位置
    var bulletInfo = Tanks.getBulletInfo();
    var openFire = Tanks.actionOpenFire(90); //开炮
    // bulletInfo = Tanks.getBulletInfo();
    // console.log(bulletInfo);
}
