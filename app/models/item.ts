export default class Item {
    produto: string;
    variedade: string;
    pais: string;
    categoria: string;
    safra: string;
    preco: number;
    constructor(produto: string, variedade: string, pais: string, categoria: string, safra: string, preco: number) {
        this.produto = produto;
        this.variedade = variedade;
        this.pais = pais;
        this.categoria = categoria;
        this.safra = safra;
        this.preco = preco;
    }
}

// {
//     "produto": "Casa Silva Reserva",
//     "variedade": "Cabernet Sauvignon",
//     "pais": "Chile",
//     "categoria": "Tinto",
//     "safra": "2014",
//     "preco": 79
// }