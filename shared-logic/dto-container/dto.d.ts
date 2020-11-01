/**
 * Data Transfer Object
 * is a container.
 */
export declare class Dto {
    id: string;
    url: string;
    targetUrl: string;
    refUrl: any;
    aggregateUrl: string;
    payload: any;
    timestamp: any;
    constructor(id?: string, url?: string, targetUrl?: string, refUrl?: any, aggregateUrl?: string, payload?: any, timestamp?: any);
}
