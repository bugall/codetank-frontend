import * as times from './middleware/time'

export interface BulletInterface {
    getBulletPosition(bulletNumber?: number, userId?: number): { x: number, y: number, time: number };
    getPositionHistory(bulletNumber?: number, userId?: number): [{ x: number, y: number, time: number }];
    getBulletsStatus(bulletNumber?: number, userId?: number): string;
    getRestAmount(userId: number): number;
    actionOpenFire(position: { x: number, y: number }): boolean;
    actionRloadBullet(): boolean;
}
export class Bullet implements BulletInterface {
    private BulletAmount: number = 0; //剩余炮弹的数量
    private BulletUsed: number = 0; //使用了多少颗炮弹
    private BulletsInfo: [{
        x: number,
        y: number,
        begin_time: number,
        status: string,
    }] = [{ x: 0, y: 0, begin_time: 0, status: '' }];
    private BulletSpeed: number = 0.0; //炮弹的速度(多少个单位时间)

    constructor(bulletAmount: number, speed: number) {
        this.BulletAmount = bulletAmount;
        this.BulletSpeed = speed;
    }

    /** 
    * 保存发射炮弹的信息
    * @param {json} postion 炮弹发射的位置
    * @returns boolean 
    * @data 2016-04-28
    * @author bugall
    */
    private addBulletPosition(position: { x: number, y: number }): boolean {
        let now = Date.parse(new Date() + '') / 1000;
        this.BulletsInfo.push({ x: position.x, y: position.y, begin_time: now, status: 'fly' });
        return true;
    }

    /** 
    * 获取用户炮弹当前的位置
    * @param {number} bulletNumber 炮弹的编号
    * @param {number} userId 用户的编号
    * @returns JSON 炮弹的位置
    * @data 2016-04-28
    * @author bugall
    */
    public getBulletPosition(bulletNumber?: number, userId?: number): { x: number, y: number, time: number } {
        return { x: 0, y: 0, time: 0 }
    }

    /** 
    * 获取某个用户某个编号的炮弹的运动轨迹
    * @param {number} bulletNumber 炮弹的编号
    * @param {number} userId 用户的编号
    * @returns Array 炮弹的历史轨迹
    * @data 2016-04-28
    * @author bugall
    */
    public getPositionHistory(bulletNumber?: number, userId?: number): [{ x: number, y: number, time: number }] {
        return [{ x: 0, y: 0, time: 0 }]
    }

    /** 
    * 获取某个用户某个编号的炮弹的的状态
    * 'fly':飞行在状态
    * 'hit':击中
    * 'scrap':报废状态
    * @param {number} bulletNumber 炮弹的编号
    * @param {number} userId 用户的编号
    * @returns String 表示状态
    * @data 2016-04-28
    * @author bugall
    */
    public getBulletsStatus(bulletNumber?: number, userId?: number): string {
        return ''
    }

    /** 
    * 获取某个用户炮弹的剩余数量
    * @param {number} userId 用户的编号
    * @returns Number 炮弹数量
    * @data 2016-04-28
    * @author bugall
    */
    public getRestAmount(userId: number): number {
        return 1
    }

    /** 
    * 发射炮弹 消耗一个单位时间
    * @param {json} position 开炮时的位置
    * @returns boolean true表示成功,false表示失败
    * @data 2016-04-28
    * @author bugall
    */
    public actionOpenFire(position: { x: number, y: number }): boolean {
        this.BulletAmount--;
        this.BulletUsed++;
        this.addBulletPosition({ x: position.y, y: position.y });
        return true;
    }

    public actionRloadBullet(): boolean {
        return true;
    }
}
