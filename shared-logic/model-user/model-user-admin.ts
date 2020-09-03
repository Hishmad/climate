export class ModelUserAdmin {

    constructor(
        public id: string = '', /** the UID */
        public userEmail: string = '',
        public userName: string = '',
        public accessLevel: number = 0, /** from 0 to 9, 9 is the supervisor access */
        public idAdmin: string,
        public timestamp: any = {},
    ) {}
}