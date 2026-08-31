# API Node.js + MongoDB

API REST de exemplo usando Express.js, Mongoose e MongoDB.

## Requisitos

- Node.js 18 ou superior
- MongoDB local ou uma URI do MongoDB Atlas

## Executar

```bash
npm install
cp .env.example .env
npm run dev
```

Edite o arquivo `.env` caso seu MongoDB use outra URI.

## Endpoints

- `GET /health` — verifica a API e a conexão com o banco
- `GET /api/users` — lista usuários
- `GET /api/users/:id` — busca um usuário
- `POST /api/users` — cria um usuário
- `PUT /api/users/:id` — atualiza um usuário
- `DELETE /api/users/:id` — remove um usuário

Exemplo de criação:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","email":"maria@example.com"}'
```

## Testes

Os testes usam um MongoDB temporário em memória:

    npm test
    npm run check

## CI/CD

O workflow ci.yml executa testes e verificação de sintaxe em pull requests e pushes.

O workflow cd.yml publica uma imagem Docker no GHCR em pushes na main ou em tags v1.0.0.
