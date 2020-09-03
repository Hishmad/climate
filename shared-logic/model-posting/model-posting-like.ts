export class ModelPostingLike {

    constructor(
        public id: string = '',
        public idUser: string = '',
        public idPosting: string = '',
        public idAdmin: string = '',
        public like: boolean = false,
        public timestamp: any = {},

    ){}
}