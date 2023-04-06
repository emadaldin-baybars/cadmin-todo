export interface iTaskReq {
    costElementId: number, // project id
    date: Date,
    description: string,
    id: null
    isDurationBased: boolean,
    timeInterval: {
        startTime: Date,
        stopTime: Date
    }
}