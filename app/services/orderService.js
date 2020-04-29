import nconf from '../config/nconf.js';
import superagent from 'superagent';
import { brDate } from './dateService.js';

export function getOrders() {
    const orderUrl = nconf.get('ORDER_HISTORY_URL');

    const promise = new Promise((resolve, reject) => {
        superagent.get(orderUrl).end( (error, response) => {
            if (error) {
                console.error(error.stack);
                console.error('orderService error:', error.message);
                reject(err);
                return;
            }
            
            const orders = response.body;
            
            orders.forEach( order => {
                order.data = brDate(order.data);
                order.cliente = parseInt(order.cliente.replace(/\./g,""))
            });
            resolve(orders);
        });
    });

    return promise;
}