import { ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY } from './environments/keys';
import * as admin from 'firebase-admin';
export const adminSdk = admin.initializeApp();
import algoliasearch, { SearchClient } from 'algoliasearch';
import { createNullCache } from '@algolia/cache-common';

export const client: SearchClient = algoliasearch(
    ALGOLIA_APP_ID,
    ALGOLIA_ADMIN_API_KEY,
    {
        responsesCache: createNullCache(),
        requestsCache: createNullCache()
    }

);
