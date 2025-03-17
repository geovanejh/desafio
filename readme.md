# Sistema de Gerenciamento de Fornecedores

Bem-vindo ao Sistema de Gerenciamento de Fornecedores, uma aplicação web desenvolvida para gerenciar informações de fornecedores, incluindo nome, descrição, contatos, endereços e exportação de dados em formato CSV. Este projeto utiliza tecnologias modernas como React, TypeScript e uma API REST para fornecer uma interface amigável e funcional.

## Funcionalidades

- **Cadastro de Fornecedores**: Adicione novos fornecedores com nome, descrição, contatos e endereço.
- **Edição e Exclusão**: Edite ou remova fornecedores existentes com confirmação de exclusão.
- **Busca**: Filtre fornecedores pelo nome na lista.
- **Máscaras de Formato**: Formate automaticamente campos como CEP (00000-000) e telefone ((99) 99999-9999).
- **Integração com API de CEP**: Preencha automaticamente logradouro, bairro, cidade e estado ao inserir um CEP válido.
- **Exportação para CSV**: Exporte a lista de fornecedores filtrados para um arquivo CSV.
- **Interface Responsiva**: Layout otimizado para diferentes tamanhos de tela.

## Pré-requisitos

Antes de instalar e executar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma API REST configurada (ex.: local ou remota) para gerenciar os dados dos fornecedores

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
   ````

2. Instale as dependências:

   ```bash
   npm install
   ````

3. Configure as variáveis de ambiente:

  Crie um arquivo .env na raiz do projeto com base no arquivo .env.example (se disponível) e adicione as credenciais da API, como a URL base.
  Exemplo de .env:
   ```bash
   VITE_BACKEND_URL="http://localhost:3001"
   VITE_VIACEP_URL="https://viacep.com.br/ws"
  ````

4. Inicie o json-server (mock backend):

   ```bash
   npm run json-server
   ````

5. Inicie a aplicação

   ```bash
   npm start
   ````

 ## Tecnologias Utilizadas
 
 Frontend:
- React - Biblioteca para construção de interfaces.
- TypeScript - Suporte a tipagem estática.
- React Router - Navegação entre páginas.
- Styled-Components - Estilização de componentes.
- Gerenciamento de Formulários:
- React Hook Form - Gerenciamento de formulários.
- Yup - Validação de formulários.

Utilitários:
- Papa Parse - Geração de arquivos CSV.
- React Hot Toast - Notificações.

Outros:
- API REST personalizada para dados de fornecedores e CEP.
