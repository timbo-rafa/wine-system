## Requirements
### 1 - Liste os clientes ordenados pelo maior valor total em compras.
GET /clientes?ordem=total_compras
### 2 - Mostre o cliente com maior compra única no último ano (2016).
GET /clientes?ordem=compra_unica&data_inicio=01/01/2016&data_fim=31/12/2016&slice=1
### 3 - Liste os clientes mais fiéis.
GET /clientes?ordem=fidelidade&data_inicio=01/05/2014&data_fim=31/12/2016
### 4 - Recomende um vinho para um determinado cliente a partir do histórico de compras.
GET /clientes/<clientId>/recomendacao

## Future Improvements

1. Discuss fidelity strategy
2. Improve recommendation system
3. Fix client identification coming from orders api (?)