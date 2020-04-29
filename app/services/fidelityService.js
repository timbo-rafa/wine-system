
export function fidelityProgram(clientOrders, dataInicio = null, dataFim = null) {
    return SimpleFidelityProgram(clientOrders, dataInicio, dataFim);
}

/**
 * Simple Fidelity Program:
 * Buy every month to get a 100% fidelity rate
 * @param {Order[]} clientOrders Array of orders from a single client
 * @param {Date} dataInicio Date when the program has started
 * @param {Date} dataFim Date when the program ends
 * @return {number} the fidelity rate
 */
function SimpleFidelityProgram(clientOrders, dataInicio = null, dataFim = null) {
    const launchDate = '01-05-2014';
    dataInicio = dataInicio || brDate(launchDate);
    dataFim = dataFim || new Date();

    let totalMonths = (dataFim.getFullYear() - dataInicio.getFullYear()) * 12;
    totalMonths += dataFim.getMonth() - dataInicio.getMonth() + 1;
    const monthsWithPurchase = new Set();

    clientOrders.map(co => co.data.getMonth().toString() + "-" + co.data.getFullYear().toString())
                .forEach(co => monthsWithPurchase.add(co));
    
    return monthsWithPurchase.size/totalMonths;
}