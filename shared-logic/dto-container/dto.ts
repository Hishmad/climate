/**
 * Data Transfer Object
 * is a container.
 */
export class Dto {
    
    constructor(
        public id: string = '',
        public url: string = '',
        public targetUrl: string = '',
        public refUrl: any = {},
        public aggregateUrl: string = '',
        public payload: any = {},
        public timestamp: any = {},
    ) {}
}
