export class CloudinaryContainer{

    static DTO_DELETE_ANY_FROM_CLOUDINARY = 'dtoDeleteAnyFromCloudinary';

    constructor(
        public id: string = '', // consumer id if any
        public listOfImagePublicId: string[] = [],
        public listOfCloudinaryImages: any[] = [],
        public timestamp: any = {},
        public idAdmin: string = ''
    ){}
}