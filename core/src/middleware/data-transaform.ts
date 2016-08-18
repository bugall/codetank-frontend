/// <reference path='../../typings/tsd.d.ts' />
import * as b from 'websocket';

export class Transform{
    _host:string = "";
    _port:number = 80;

    constructor(host:string,port?:number){
        this._host = host;
        this._port = port || 80;
    }

    public createConnection(){
        console.log(b);
    }
}