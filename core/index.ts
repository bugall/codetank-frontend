import * as Tank from './src/tank';

//init params
let opts = {
    bulletAmount:10,
    speed:5,
    mapSize:{
        x:10,
        y:10
    },
    maxStepLength:1
}
let Tanks = new Tank.Tank(opts);
Tanks.test(); //测试模拟数据；
console.log(Tanks);

setInterval(test,1000);
function test() {
    let position = Tanks.getTankPosition()// 获取自己坦克的位置
    let bulletInfo = Tanks.getBulletInfo();
    let openFire = Tanks.actionOpenFire(90) //开炮
    // bulletInfo = Tanks.getBulletInfo();
    // console.log(bulletInfo);
}