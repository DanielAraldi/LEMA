# LEMA Univali

Uma aplicação que conecta servidores GeoNode, Portal e Rocker Shiny usando a ferramenta de proxy reverso Nginx e Docker.

### Fluxo de Desenvolvimento

- [ ] O usuário realiza a uma requisição para acessar algum serviço.
- [ ] O Nginx terá `upstreams` com cada uma das URLs dos servidores.
- [ ] Depois que o usuário ser redirecionado para o servidor correto, o servidor processa e da a resposta para o usuário.
- [ ] O usuário recebe as informações vindas pelo servidor e ele fica feliz.

### Diagrama de Fluxo

![Diagrama de Fluxo](https://github.com/DanielAraldi/oceanography/assets/50931267/625c6683-8494-4cf1-8b91-7e1eb3a2631d)

### Documentações

- [GeoNode](./geonode/README.md)
- [Nginx](./nginx/README.md)
- [Portal](./portal/README.md)
