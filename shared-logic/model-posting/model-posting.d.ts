export declare class ModelPosting {
    id: string;
    idUser: string;
    userName: string;
    userMobileNumber: string;
    photoUserUrl: string;
    message: string;
    listOfLikes: string[];
    listOfImagePublicId: string[];
    listOfCloudinaryImages: any[];
    attachAsset: any;
    youtubeUrl: string;
    alertStatus: string;
    address: string;
    city: string;
    postCode: number;
    state: string;
    country: string;
    lat: number;
    lng: number;
    timestamp: any;
    idAdmin: string;
    constructor(id?: string, idUser?: string, userName?: string, userMobileNumber?: string, photoUserUrl?: string, message?: string, listOfLikes?: string[], listOfImagePublicId?: string[], listOfCloudinaryImages?: any[], attachAsset?: any, youtubeUrl?: string, alertStatus?: string, address?: string, city?: string, postCode?: number, state?: string, country?: string, lat?: number, lng?: number, timestamp?: any, idAdmin?: string);
}
