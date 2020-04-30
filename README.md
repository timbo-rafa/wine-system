# Discussion

The key required functionalities are characteristically done by a back-end API and, due to time constraints, no front-end has been developed for the time being. You can see some of my zero-installation front-end demos [here](https://github.com/timbo-rafa?tab=repositories&q=frontend+demo).

Apart from the recommendations, all requirements are met from a basic API call to read the clients, applying some sort of filtering and ordering. Thus, following REST standards, the API should be `GET /clientes`, appended by query strings to filter the listing of clients appropriately. `ordem` can be used to sort and `data_inicio` and `data_fim` set a time range. Please see [Requirements](#Requirements) sections for examples.

As for the recommendation system, it is a common use case of machine learning.
The Python community has a strong presence in ML, using, for example,
[scikit](https://scikit-learn.org/), making Python a natural choice for recommendation systems.
The [wine recommendation microservice](https://github.com/timbo-rafa/wine-system) was then decoupled from this nodejs application, making it easier to maintain, scale, and increment.

For unit test demos, please [click here](https://github.com/timbo-rafa?tab=repositories&q=test+demo).

## Requirements
### 1 - Liste os clientes ordenados pelo maior valor total em compras.
`GET /clientes?ordem=total_compras`
### 2 - Mostre o cliente com maior compra única no último ano (2016).
`GET /clientes?ordem=compra_unica&data_inicio=01/01/2016&data_fim=31/12/2016&slice=1`
### 3 - Liste os clientes mais fiéis.
`GET /clientes?ordem=fidelidade&data_inicio=01/05/2014&data_fim=31/12/2016`
### 4 - Recomende um vinho para um determinado cliente a partir do histórico de compras.
`GET /clientes/<clientId>/recomendacao`

## Future Improvements

1. Improve fidelity strategy
2. Improve recommendation system
3. Fix client identification coming from orders api (?)
4. Containerize applications with docker for better deployment, portability and scalability. See [Docker demos](https://github.com/timbo-rafa?tab=repositories&q=docker+demo)
5. Internationalization and localization of string resources