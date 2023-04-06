export interface iDayToLog{
    totalSeconds: number,
    hours: number,
    isNotWorkingDay: boolean
}

export interface iChartBar{
    day: number,
    date: string,
    presenceTime: iDayToLog,
    trackedTime: iDayToLog,
    vacationHours: iDayToLog
}

export interface iChartsData{
    isAdmin: boolean,
    startWeekDate: Date,
    workingHours: number,
    chartBars: Array<iChartBar>
}

