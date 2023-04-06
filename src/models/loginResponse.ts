export interface iUser {
    id: number,
    jwtBearerToken: string,
    displayName: string,
    firstName: string,
    lastName: string,
    refreshToken: string,
    userName: string
    email: string,
    cultureId: number
    currencyId: number,
    isActive: boolean,
    isTimeAccountingMandatory: boolean,
    isPurchaseOrderApprovingPerson: boolean,
}

export class User implements iUser {
    id: number = -1
    jwtBearerToken: string = ""
    displayName: string = ""
    firstName: string = ""
    lastName: string = ""
    refreshToken: string = ""
    userName: string = ""
    email: string = ""
    cultureId: number = -1
    currencyId: number = -1
    isActive: boolean = false
    isTimeAccountingMandatory: boolean = false
    isPurchaseOrderApprovingPerson: boolean = false

    constructor(data?: iUser) {
      if (data) {
        for (const property in data) {
          if (data.hasOwnProperty(property)) {
            (<any>this)[property] = (<any>data)[property];
          }
        }
      }
    }

}