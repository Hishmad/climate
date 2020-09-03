export class GeoAddress {
    
    constructor(
        public address: string = '',
        public city: string = '',
        public postCode: number = 0,
        public state: string = '',
        public country: string = '',
        public lat: number = 0,
        public lng: number = 0,
    ) { }
}