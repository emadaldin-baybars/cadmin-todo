
export interface iCurrentTimeEntry {
    id?: number,
    isFinished?: boolean,
    lastUpdateTime?: Date,
    startTime?: Date,
    stopTime?: Date,
    taskId?: number
}

export class CurrentTimeEntry implements iCurrentTimeEntry {
    constructor(data?: iCurrentTimeEntry) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface iTaskItem {
    costCenterName?: string,
    costElementId?: number,
    costElementName?: string,
    costElementType?: string,
    currentTimeEntry?: iCurrentTimeEntry | null,
    date?: Date,
    description: string,
    id?: number,
    invoiceId?: number,
    isDurationBased?: boolean,
    isPausedAutomatically?: boolean,
    isProjectPositionEntry?: boolean,
    isReadOnly?: boolean,
    isUnfinished: boolean,
    projectBusinessPartnerName?: string,
    projectDescription?: string,
    projectId?: number,
    projectOldId?: number,
    projectPositionDescription?: string,
    projectPositionId?: number,
    status?: number,
    totalSeconds?: number,
    userId?: number,
    workCategoryId?: number,
    workCategoryName?: string
}

export class TaskItem implements iTaskItem {

    costCenterName?: string = "";
    costElementId?: number = -1;
    costElementName?: string = "";
    costElementType?: string = "";
    currentTimeEntry?: iCurrentTimeEntry | null = null;
    date?: Date = new Date();

    private _description: string = "";
    get description(): string {
        return this._description.replace(/(<+[a-z]+>)|(<+\/+[a-z]+>)/g, "");
    }
    set description(_str: string){
        this._description = _str;
    }

    id?: number = -1;
    invoiceId?: number = -1;
    isDurationBased?: boolean = false;
    isPausedAutomatically?: boolean = false;
    isProjectPositionEntry?: boolean = false;
    isReadOnly?: boolean = false;
    isUnfinished: boolean = false;
    projectBusinessPartnerName?: string = "";
    projectDescription?: string = "";
    projectId?: number = -1;
    projectOldId?: number = -1;
    projectPositionDescription?: string = "";
    projectPositionId?: number = -1;
    status?: number = -1;
    totalSeconds?: number = -1;
    userId?: number = -1;
    workCategoryId?: number = -1;
    workCategoryName?: string = "";

    constructor();
    constructor(data: iTaskItem);
    constructor(data?: iTaskItem) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    
}