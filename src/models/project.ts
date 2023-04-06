export interface iProject {
    entryLastUpdateTime?: Date,
    isFavorite?: boolean,
    projectBusinessPartnerName?: string,
    projectDescription: string,
    projectId: number,
    projectOldId?: string
}

export class Project implements iProject {
    entryLastUpdateTime?: Date | undefined;
    isFavorite?: boolean | undefined;
    projectBusinessPartnerName?: string | undefined;
    projectDescription: string = '';
    projectId: number = -1;
    projectOldId?: string | undefined;
    
    constructor(data?: iProject) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface iPosition {
    id: number,
    description: string,
    children?: Array<any>
}

export class Position implements iPosition{ 
    id: number = -1;
    description: string = '';
    children?: any[] | undefined;

    constructor(data?: iPosition) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}

export interface iInternalProject {
    id: number,
    children?: Array<any>,
    description: string,
    positions?: Array<iPosition>
}

export class InternalProject implements iInternalProject {
    id: number = -1;
    children?: any[] | undefined;
    description: string = '';
    positions?: iPosition[] | undefined;

    constructor(data?: iInternalProject) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }
}