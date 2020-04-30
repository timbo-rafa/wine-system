import Router from 'express';
import {getClients} from '../services/clientService.js';
import {getOrders} from '../services/orderService.js';
import { brDate } from '../services/dateService.js';
import { fidelityProgram } from '../services/fidelityService.js';
import { recommendation } from '../services/recommendationService.js';

const router = Router()

router.route('/').get(async function help(req, res, next) {
    Promise.all([getClients(), getOrders()])
        .then(clientsAndOrders => {
            let clients, orders;
            [clients, orders] = clientsAndOrders;
            const parsedClients = clientQuery(clients, orders, req.query);
            res.status(200).send(parsedClients);
        })
        .catch( e => res.status(400).send(e.message));
})

router.route('/:cliente/recomendacao').get(function hash(req, res, next) {
    const cliente = req.cliente
    recommendation(cliente).then( recommendations => {
        res.status(200).send(recommendations);
    })
    .catch( e => res.status(400).send(e.message));
})

router.param('cliente', function (request, response, next, cliente) {
    request.cliente = cliente
    return next()
})

function clientQuery(clients, orders, query) {
    let dataInicio = null;
    if ('data_inicio' in query) {
        dataInicio = brDate(query.data_inicio);
        orders = orders.filter( order => order.data >= dataInicio);
    }

    let dataFim = null;
    if ('data_fim' in query) {
        dataFim = brDate(query.data_fim);

        if (dataInicio && dataInicio > dataFim) {
            throw new Error('"data_inicio" deve vir antes de "data_fim"');
        }

        orders = orders.filter( order => order.data <= dataFim);
    }

    if('ordem' in query) {
        clients.forEach( client => {
            let clientOrders = orders.filter(order => order.cliente === client.id);

            if (query.ordem === "compra_unica") {
                const greatestOrder = clientOrders.reduce( (prev, cur) => prev.valorTotal >= cur.valorTotal ? prev : cur,
                    { valorTotal:0 });
                client.valorTotal = greatestOrder.valorTotal;
            }
            else if (query.ordem === "total_compras") {

                const valorTotal = clientOrders.map(co => co.valorTotal)
                                               .reduce((prev, cur) => prev + cur, 0.0);
                client.valorTotal = valorTotal;
            }
            else if (query.ordem === "fidelidade") {
                client.fidelidade = fidelityProgram(clientOrders, dataInicio, dataFim) * 100;
            }
        })

        if (query.ordem === "compra_unica" || query.ordem === "total_compras") {
            clients.sort( (c1, c2) => c2.valorTotal - c1.valorTotal);
        }

        if (query.ordem === "fidelidade") {
            clients.sort( (c1, c2) => c2.fidelidade - c1.fidelidade);
            clients.forEach ( c => c.fidelidade = c.fidelidade.toString() + '%');
        }
    }

    if('slice' in query) {
        const slice = parseInt(query.slice);

        if (slice < 1) {
            throw new Error('"slice" deve ser positivo.');
        }

        clients = clients.slice(0, slice);
    }

    return clients;
}

export default router


// ## Requirements
// ### 1 - Liste os clientes ordenados pelo maior valor total em compras.
// GET /clientes?ordem=total_compras
// ### 2 - Mostre o cliente com maior compra única no último ano (2016).
// GET /clientes?ordem=compra_unica&data_inicio=01/01/2016&data_fim=31/12/2016
// ### 3 - Liste os clientes mais fiéis.
// GET /clientes?