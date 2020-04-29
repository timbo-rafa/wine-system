import nconf from '../config/nconf.js';
import superagent from 'superagent';

export function recommendation(client) {
    const recommendationApiUrl = nconf.get('RECOMMENDATION_API_HOST') +
                                ':' + nconf.get('RECOMMENDATION_API_PORT');

    const promise = new Promise((resolve) => {
        superagent.get(recommendationApiUrl + '/' + client).end( (error, response) => {
            if (error) {
                throw error;
            }

            const recommendation = response.body;
            resolve(recommendation);
        });
    });

    return promise;
}