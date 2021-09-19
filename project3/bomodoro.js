class Bomodoro{
    constructor(work_interval,rest_interval,work_rounds){
        this.work_interval = work_interval;
        this.rest_interval = rest_interval;
        this.work_rounds = work_rounds;
    }

    updateMin(updatedTime){
        this.sec = updatedTime%60;
        this.min = Math.floor(updatedTime/60);
        return {"sec":this.sec,"min":this.min}
    }
}

export {Bomodoro}



    