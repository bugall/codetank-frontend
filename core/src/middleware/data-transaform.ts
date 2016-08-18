/// <reference path='../../typings/tsd.d.ts' />
var W3CWebSocket = require('websocket').w3cwebsocket;

export class Transform{
    _host:string = "";
    _port:number = 80;
    _client:any  = null;

    constructor(host:string,port?:number){
        this._host = host;
        this._port = port || 80;
        this._client = new W3CWebSocket(`ws://${host}:${port}/`, 'echo-protocol');

        const  self = this;
        this._client.onopen = this.onOpen();
        this._client.onerror = this.onError();
        this._client.onclose = this.onClose();
        this._client.onmessage = function(message:any){
            self.onMessage(message);
        }
    }

    public createConnection(){

    }
    public onOpen():any{
        console.info('Connection is ready');
    }
    public onError(error?:any):any{
        console.info('Connection error:',error);
    }
    public onClose():any{
        console.info('Connection is closed');
    }
    public onMessage(message?:any):any{
        console.log(message);
        if (typeof message.data === 'string') {
            console.log("Received: '" + message.data + "'");
        }else{
            this.onError('数据格式错误');
        }
    }
}