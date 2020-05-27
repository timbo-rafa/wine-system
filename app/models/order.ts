import Item from './item';

export default class Order {
    codigo: string;
    data: Date;
    cliente: string;
    itens: Item[];
    valorTotal: number;
    constructor(codigo: string, data: Date, cliente: string, itens: Item[], valorTotal: number) {
        this.codigo = codigo;
        this.data = data;
        this.cliente = cliente;
        this.itens = itens;
        this.valorTotal = valorTotal;
    }
}

// "codigo": "3fde36a6-c9a1-4d27-9f0f-7c12ab0d1cdd",
// "data": "19-02-2016",
// "cliente": "000.000.000.01",
// "itens": [
//     {
//         "produto": "Casa Silva Reserva",
//         "variedade": "Cabernet Sauvignon",
//         "pais": "Chile",
//         "categoria": "Tinto",
//         "safra": "2014",
//         "preco": 79
//     },
//     {
//         "produto": "Casa Silva Reserva",
//         "variedade": "Carménère",
//         "pais": "Chile",
//         "categoria": "Tinto",
//         "safra": "2014",
//         "preco": 79
//     }
// ],
// "valorTotal": 158