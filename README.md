# Prova Técnica Backend

Este é um exemplo de aplicação Node.js que utiliza TypeORM e PostgreSQL.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas no seu sistema:

- Node.js (>=16.x)
- Npm (>=8.x)
- Docker (>=20.x)

## Configuração Local

### 1. Clonar o Repositório

Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/JPedroCh/API-RESTful.git
cd API-RESTful
```

### 2. Instalar Dependências

Instale as dependências do projeto usando o Yarn:

```bash
npm install
```

### 3. Configurar o Banco de Dados

Configure o banco de dados PostgreSQL de maneira que tenha um endereço url acessível. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```env
DB_URL=
DB_PORT=
API_PORT=
```

**OBS**: caso a DB_PORT não seja fornecida, será utilizada a porta 5432 do banco de dados e caso a API_PORT não seja fornecida, será utilizada a porta 4001 para a API.

### 4. Executar testes automatizados da Aplicação

Execute o seguinte comando e serão executados todos os testes implementados:

```bash
npm test
```


### 4. Iniciar a Aplicação

Inicie a aplicação em ambiente de desenvolvimento:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:<API_PORT>`.

## Configuração com Docker

### 1. Construir a Imagem Docker

Construa a imagem Docker da aplicação:

```bash
docker build -t <nome_da_imagem> .
```

### 2. Iniciar o Contêiner

Inicie o contêineres usando o seguinte comando:

```bash
docker run -p <API_PORT>:<API_PORT> <nome_da_imagem>
```

A aplicação estará disponível em `http://localhost:<API_PORT>`.

## Requisições

### Base URL

```bash
http://localhost:<API_PORT>
```

### Endpoints

* **POST /create** - Cria uma nova notícia

    ```json
    {
      "titulo": "Nova Notícia",
      "descricao": "Descrição da nova notícia"
    }
    ```

* **GET /list** - Lista todas as notícias

  **OBS**: Não precisa de parâmetros

* **PUT /update** - Atualiza uma notícia

  ```json
  {
    "id": 2,
    "titulo": "Notícia Atualizada",
    "descricao": "Descrição da nova notícia"
  }
  ```

* **DELETE /delete** - Remove uma notícia específica

  ```json
  {
    "id": 2
  }
  ```

## Contribuição

Se você deseja contribuir para este projeto, por favor siga estas etapas:

1. Fork o repositório
2. Crie uma nova branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request para a branch `develop`

## Estrutura de Pastas/Arquivos

```bash
my-app/
├── src/
│   ├── api/
│       ├──adapters/
│       ├── controllers/
│       ├── repositories/
│       ├── services/
│   ├── database/
│       ├──entities/
│       ├──config.ts
│   ├── helpers/
│       ├──errors.ts
│       ├──http.ts
│   ├── index.ts
│   └── routes.ts
├── .env
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json

```

### Descrição das Pastar e Arquivos

- `src/` - Diretório principal onde está o código fonte da aplicação.
- `src/api/` - Diretório onde está o código relacionado a API e suas regras de negócio
- `src/api/adapters/` - Onde estão as funções responsáveis por converter/adaptar funções de bibliotecas para a necessidade do projeto
- `src/api/controllers/` - Onde estão as funções responsáveis por receber a requisição e direcionar para o serviço correto para que seja processada a requisição e entregue a resposta para o cliente
- `src/api/repositories/` - Onde estão as funções responsáveis pela montagem das **Queries**
- `src/api/services/` - Onde estão as funções de serviço com as regras de negócio
- `src/database/` - Diretório onde está o código relacionado ao banco de dados
- `src/database/entities/` - Onde estão as definições das entidades do banco de dados
- `src/database/config.ts` - Arquivo de configuração do banco de dados
- `src/helpers/` - Onde estão arquivos com definições de classes que podem ser utilizadas em diversas partes do código, por exemplo: mensagens de erro
- `src/index.ts` - Configuração geral do servidor
- `src/routes` - Apresenta todas as rotas do Express

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.
