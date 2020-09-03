export class ModelUser {

    constructor(
        public id: string,
        public userEmail: string = '',
        public listOfLikes: string[] = [],
        public timestamp: any = {},
    ) {

    }
}