import nconf from '../config/nconf.js';
import superagent from 'superagent';

export function getClients(filters) {
    const clientUrl = nconf.get('CLIENT_URL');

    const promise = new Promise((resolve) => {
        superagent.get(clientUrl).end( (error, response) => {
            if (error) {
                throw error;
            }

            const clients = response.body;
            resolve(clients);
        });
    });

    return promise;
}