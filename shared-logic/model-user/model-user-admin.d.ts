export declare class ModelUserAdmin {
    id: string;
    userEmail: string;
    userName: string;
    accessLevel: number;
    idAdmin: string;
    timestamp: any;
    constructor(id: string, /** the UID */ userEmail: string, userName: string, accessLevel: number, /** from 0 to 9, 9 is the supervisor access */ idAdmin: string, timestamp?: any);
}
