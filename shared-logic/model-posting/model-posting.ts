export class ModelPosting {

    constructor(
        public id: string = '',
        public idUser: string = '',
        public userName: string = '',
        public userMobileNumber: string = '',
        public photoUserUrl: string = '',
        public message: string = '',
        public listOfLikes: string[] = [],
        public listOfImagePublicId: string[] = [],
        public listOfCloudinaryImages: any[] = [],
        public attachAsset: any = {},
        public youtubeUrl: string = '',
        public alertStatus: string = '',
        public address: string = '',
        public city: string = '',
        public postCode: number = 0,
        public state: string = '',
        public country: string = '',
        public lat: number = 0,
        public lng: number = 0,
        public timestamp: any = {},
        public idAdmin: string = ''
    ) { }

}