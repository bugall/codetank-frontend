import * as bullet from './bullet'

export interface TankInterface{
    actionGo(position:{x:number,y:number}):boolean;
    getPosition(userId?:number):{x:number,y:number};
    actionOpenFire(position:{x:number,y:number}):boolean;
}

export class Tank extends bullet.Bullet implements TankInterface {
    private isHaveTime:boolean;
    private isStartOfTurn:boolean;
    private selfPosition:{x:number,y:number}={x:0,y:0};
    private maxStepLength:number=0;
    private mapSize:{x:number,y:number}={x:0,y:0};
    private BulletIsFull: boolean = false; //是否已经填充炮弹
    
    constructor(opts:{
        bulletAmount:number, //默认炮弹的数量
        speed:number, //炮弹的速度
        mapSize:{x:number,y:number}, //地图的大小(右上角的坐标),左下角的坐标是(0,0)~(x,y)
        maxStepLength:number, //一个时间单位内坦克的最大移动距离
    }){
        super(opts.bulletAmount,opts.speed);
        this.maxStepLength = opts.maxStepLength;
        this.mapSize = opts.mapSize;
    } 
    
    /** 
    * 检查移动到的位置是不是合法
    * @param {json} postion 移动到的位置
    * @returns boolean 
    * @data 2016-05-01
    * @author bugall
    */
    private actionGoChech(position:{x:number,y:number}):boolean{
        if (!this.isStartOfTurn || !this.isHaveTime) throw new Error('回合暂未开始');
        if (!(Math.abs(this.selfPosition.x - position.x) > this.maxStepLength) || !(Math.abs(this.selfPosition.y - position.y) > this.maxStepLength)) throw new Error('位置不合法');
        if ((this.selfPosition.x < 0) || (this.selfPosition.y < 0)) throw new Error('位置越界');
        if (position.x>this.mapSize.x||position.y>this.mapSize.y) throw new Error('位置越界');
        return true;
    }
    
     /** 
    * 移动
    * @param {json} postion 移动到的位置
    * @returns boolean 
    * @data 2016-05-01
    * @author bugall
    */
    public actionGo(position:{x:number,y:number}):boolean{
        let isParamsPass:boolean = this.actionGoChech(position);
        
        //更新移动后的状态
        if(isParamsPass){
            this.isHaveTime=false;
            this.isStartOfTurn=false;
            this.selfPosition = {x:position.x,y:position.y};
        }
        return true;
    }
    
     /** 
    * 获取用户的位置
    * @param {number} userId 用户的id,不输入表示自己的位置
    * @returns JSON
    * @data 2016-05-01
    * @author bugall
    */
    public getPosition(userId?: number): { x: number, y: number } {
        if (!userId) {
            return this.selfPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
}
