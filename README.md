<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Boilerplate NestJS API

Este projeto é um boilerplate para aplicações NestJS seguindo uma arquitetura modular e organizada.

## Estrutura do Projeto

A estrutura do projeto é organizada em camadas, facilitando a manutenção e escalabilidade do código.

### Diretórios Principais

- **application/**: Contém a lógica de aplicação, incluindo eventos, gateways e controladores HTTP.
  - `cronjobs/`: Jobs agendados
  - `gateway/`: Implementação de WebSockets e outros gateways de comunicação.
  - `http/`: Controladores e serviços expostos via API REST.
- **domain/**: Representa o domínio da aplicação, com as entidades e regras de negócio.
  - `shared/`: Contém código reutilizável entre diferentes domínios.
- **infrastructure/**: Responsável pela infraestrutura do projeto, como conexão com bancos de dados e repositórios.
  - `configuration/`: Configurações gerais da aplicação
  - `database/`: Configuração e implementação do banco de dados.
- **integrations/**: Módulo destinado a integrações com serviços externos.
- **utils/**: Contém utilitários e funções auxiliares.

Além desses diretórios, os arquivos principais são:
- `app.module.ts`: Módulo raiz da aplicação NestJS.
- `main.ts`: Ponto de entrada da aplicação.

## Como Adicionar Novas Features

Para adicionar uma nova feature, siga os seguintes passos:

1. **Criar a entidade no domínio**:
   - Adicione um novo diretório dentro de `domain/` correspondente à nova feature.
   - Defina os modelos, interfaces e serviços necessários para a regra de negócio.

2. **Adicionar os serviços de aplicação**:
   - Dentro de `application/`, crie os controladores em `http/` e os eventos, se necessário.
   - Caso a feature precise de WebSockets, adicione no `gateway/`.

3. **Criar a infraestrutura**:
   - Se a feature precisar de banco de dados, adicione as configurações em `infrastructure/database/`.

   - Para criar uma migration, execute `npm run m:create --name=your_migration`

4. **Registrar o módulo**:
   - Adicione o novo módulo ao `app.module.ts` para que o NestJS o reconheça.

5. **Testar a implementação**:
   - Teste a API utilizando ferramentas como Postman ou Insomnia.
   - Crie testes automatizados para validar o funcionamento.

Com essa estrutura modular, novas funcionalidades podem ser adicionadas de forma organizada e escalável.
