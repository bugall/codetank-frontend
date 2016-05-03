export interface TimeInterface {
    showName(name: string):void;
}

export class Time implements TimeInterface {
    public showName(name: string): void {
        console.log(name);
    }
}