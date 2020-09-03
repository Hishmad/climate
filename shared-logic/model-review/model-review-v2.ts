export class ModelReviewV2 {

    constructor(
        public id: string = '',
        public idPosting: string = '',
        public idHost: string = '',
        public idUser: string = '',
        public ratings: number = 1,
        public userFullName: string = '',
        public photoUserUrl: string = '',
        public comment: string = '',
        public reply: any[] = [],
        public idAdmin: string = '',
        public timestamp: any = {}
    ) { }

}