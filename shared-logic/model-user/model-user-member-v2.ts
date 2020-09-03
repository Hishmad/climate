export class ModelUserMemberV2 {

    constructor(
        public id: string = '',
        public userFullName: string = '',
        public userMobileNumber: string = '',
        public idAdmin: string = '',
        public listOfPhotoProfilePublicId: string[] = [],
        public listOfCloudinaryImages: any[] = [],
        public timestamp: any = {},

    ) { }
}