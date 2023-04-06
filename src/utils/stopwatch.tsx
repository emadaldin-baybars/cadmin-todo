export interface iTime {
    hr: number,
    min: number,
    sec: number
}

export class StopWatch{

    private hr: number = 0;
    private min: number = 0;
    private sec: number = 0;
    private stoptime:boolean = true;
    timer: string = '';
    saveTime: any;

    

    constructor(startTime: iTime, saveCallback: any){
        this.hr = startTime.hr;
        this.min = startTime.min;
        this.sec = startTime.sec;

        this.saveTime = saveCallback;
    }

    getInstance = () => {

    }

    startTimer = (): void => {
        if (this.stoptime == true) {
            this.stoptime = false;
            this.timerCycle();
        }
    }

    stopTimer = (): void => {
        if (this.stoptime == false) {
            this.stoptime = true;
        }
    }

    timerCycle = (): void => {
        if (this.stoptime == false) {

            this.sec = this.sec + 1;

            if (this.sec == 60) {
                this.min = this.min + 1;
                this.sec = 0;
            }
            if (this.min == 60) {
                this.hr = this.hr + 1;
                this.min = 0;
                this.sec = 0;
            }

            this.timer = `${this.timeUnit(this.hr)}:${this.timeUnit(this.min)}:${this.timeUnit(this.sec)}`
            this.saveTime(this.timer)
            setTimeout(() => this.timerCycle(), 1000);
        }
    }

    private timeUnit = (time: number): string => {
        if (time < 10) {
            return `0${time}`;
        } else {
            return `${time}`
        }
    }

    resetTimer = (): string => {
        this.timer = '00:00:00'
        return this.timer;
    }
}

