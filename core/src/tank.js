"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var bullet = require('./bullet');
var Tank = (function (_super) {
    __extends(Tank, _super);
    function Tank(opts) {
        _super.call(this, opts.bulletAmount, opts.speed);
        this.selfPosition = { x: 0, y: 0 };
        this.maxStepLength = 0;
        this.mapSize = { x: 0, y: 0 };
        this.roundNumber = 0; //第几回合
        this.maxStepLength = opts.maxStepLength;
        this.mapSize = opts.mapSize;
        this.test();
    }
    /**
    * 检查移动到的位置是不是合法
    * @param {json} postion 移动到的位置
    * @returns boolean
    * @data 2016-05-01
    * @author bugall
    */
    Tank.prototype.actionGoChech = function (position) {
        if (!this.isStartOfTurn || !this.isHaveTime)
            throw new Error('回合暂未开始');
        if (!(Math.abs(this.selfPosition.x - position.x) > this.maxStepLength) || !(Math.abs(this.selfPosition.y - position.y) > this.maxStepLength))
            throw new Error('位置不合法');
        if ((this.selfPosition.x < 0) || (this.selfPosition.y < 0))
            throw new Error('位置越界');
        if (position.x > this.mapSize.x || position.y > this.mapSize.y)
            throw new Error('位置越界');
        return true;
    };
    /**
    * 移动
    * @param {json} postion 移动到的位置
    * @returns boolean
    * @data 2016-05-01
    * @author bugall
    */
    Tank.prototype.actionGo = function (position) {
        var isParamsPass = this.actionGoChech(position);
        //更新移动后的状态
        if (isParamsPass) {
            this.isHaveTime = false;
            this.isStartOfTurn = false;
            this.selfPosition = { x: position.x, y: position.y };
        }
        return true;
    };
    Tank.prototype.actionOpenFire = function (angle) {
        var status = false;
        if (!this.isStartOfTurn || !this.isHaveTime) {
            throw new Error('回合暂未开始');
        }
        else {
            status = this.bulletOpenFire(this.selfPosition, this.roundNumber, angle);
        }
        return status;
    };
    /**
    * 获取用户的位置
    * @param {number} userId 用户的id,不输入表示自己的位置
    * @returns JSON
    * @data 2016-05-01
    * @author bugall
    */
    Tank.prototype.getTankPosition = function (userId) {
        if (!userId) {
            return this.selfPosition;
        }
        else {
            return { x: 0, y: 0 };
        }
    };
    Tank.prototype.test = function () {
        var self = this;
        setInterval(function () {
            self.isHaveTime = true;
            self.isStartOfTurn = true;
            self.roundNumber++;
            self.calculationBulletPosition();
        }, 2000);
    };
    //更新炮弹的位置
    Tank.prototype.calculationBulletPosition = function () {
        console.log(this.bulletsInfo);
        this.bulletsInfo.map(function (item) {
        });
    };
    return Tank;
}(bullet.Bullet));
exports.Tank = Tank;
