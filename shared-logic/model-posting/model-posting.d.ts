export declare class ModelPosting {
    id: string;
    idUser: string;
    userEmail: string;
    userName: string;
    brokerHouse: string;
    userMobileNumber: string;
    photoUserUrl: string;
    message: string;
    listOfMedia: string[];
    listOfThumbnail: string[];
    listOfImagePublicId: string[];
    listOfLikes: string[];
    listOfCloudinaryImages: any[];
    attachAsset: any;
    ownershipStatus: string;
    timestamp: any;
    idAdmin: string;
    constructor(id?: string, idUser?: string, userEmail?: string, userName?: string, brokerHouse?: string, userMobileNumber?: string, photoUserUrl?: string, message?: string, listOfMedia?: string[], listOfThumbnail?: string[], listOfImagePublicId?: string[], listOfLikes?: string[], listOfCloudinaryImages?: any[], attachAsset?: any, ownershipStatus?: string, // Owner, Broker Co, Agent
    timestamp?: any, idAdmin?: string);
}
