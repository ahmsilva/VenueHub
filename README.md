# VenueHub

Aplicação para cadastro e consulta de locais para eventos. A interface está localizada em `index.html` e demais páginas dentro da pasta `src/pages`.

## Backend

Foi adicionado um backend simples usando [Express](https://expressjs.com/) para persistir dados no arquivo `db.json`.

### Como iniciar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
   O servidor será executado em `http://localhost:3000`.

## Novas Páginas

- **`src/pages/locais.html`** – lista todos os locais cadastrados no sistema.

Para visualizar, com o servidor em execução, abra `src/pages/locais.html` em seu navegador.
