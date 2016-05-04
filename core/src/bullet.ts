import * as times from './middleware/time'

export interface BulletInterface {
    getBulletPosition(bulletNumber?: number, userId?: number): { x: number, y: number, time: number };
    getPositionHistory(bulletNumber?: number, userId?: number): [{ x: number, y: number, time: number }];
    getBulletsStatus(bulletNumber?: number, userId?: number): string;
    getRestAmount(userId: number): number;
    getBulletInfo(userId?:number):{};
    //actionOpenFire(position: { x: number, y: number }): boolean;
    actionRloadBullet(): boolean;
    
}
export class Bullet implements BulletInterface {
    private bulletAmount: number = 0; //剩余炮弹的数量
    private bulletUsed: number = 0; //使用了多少颗炮弹
    protected bulletIsReady:boolean = true; //炮弹是否填充好了
    protected bulletsInfo: [{
        x: number,
        y: number,
        begin_time: number,
        status: string,
        roundNumber:number,
        angle:number, //角度
    }] = [{ x: 0, y: 0, begin_time: 0, status: '',roundNumber:0,angle:0}];
    private bulletSpeed: number = 0.0; //炮弹的速度(一个回合多少个单位距离)

    constructor(bulletAmount: number, speed: number) {
        this.bulletAmount = bulletAmount;
        this.bulletSpeed = speed;
    }
   
    /** 
    * 保存发射炮弹的信息
    * @param {json} postion 炮弹发射的位置
    * @returns boolean 
    * @data 2016-04-28
    * @author bugall
    */
    private addBulletPosition(position: { x: number, y: number },roundNumber:number,angle:number): boolean {
        let now = Date.parse(new Date() + '') / 1000;
        this.bulletsInfo.push({ x: position.x, y: position.y, begin_time: now, status: 'fly',roundNumber:roundNumber,angle:angle});
        return true;
    }

    public getBulletInfo(){
        return{
            bulletAmount:this.bulletAmount,
            bulletUsed:this.bulletUsed,
            bulletIsReady:this.bulletIsReady,
            bulletsInfo:this.bulletsInfo
        }
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
    protected bulletOpenFire(position: { x: number, y: number },roundNumber:number,angle:number): boolean {
        //判断是否有炮弹,剩余炮弹大于等于1
        if (this.bulletIsReady&&this.bulletAmount>=0) {
            this.bulletAmount--;
            this.bulletUsed++;
            this.addBulletPosition({ x: position.y, y: position.y },roundNumber,angle);
        }else{
            return false;
        }
    }
    
    public actionRloadBullet(): boolean {
        return true;
    }
}
