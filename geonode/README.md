# GeoNode

Este é o projeto GeoNode. Gerado a partir de um projeto `django` com suporte ao GeoNode.

## Como preparar o ambiente?

```bash
  source /usr/share/virtualenvwrapper/virtualenvwrapper.sh
  mkvirtualenv --python=/usr/bin/python3 geonode

  pip install Django==3.2.13

  cd ./geonode
  python create-envfile.py --env_type=test --geonodepwd=abc123 --geoserverpwd=abc123 --pgpwd=postgres --dbpwd=geonode --geodbpwd=geonode
```

> Certifique-se que você está na raiz do projeto.

### Sobre o `create-envfile.py`

O `create-envfile.py` aceita os seguintes argumentos:

- `--https`: Habilita SSL. É desabilitado por padrão.
- `--env_type`:
  - Quando dado como `prod` o `DEBUG` é desabilitado e é gerado a criação de uma certificado `SSL` que é solicitada pelo servidor `Letsencrypt's ACME`.
  - Quando dado como `test` o `DEBUG` é desabilitado e é gerado um certificado `SSL` para testes locais.
  - Quando dado como `dev` o `DEBUG` é habilitado e não é gerado um certificado `SSL`.
- `--hostname`: A URL que será usada pelo servidor GeoNode (`localhost` é o padrão).
- `--email`: O e-mail do administrador. Notifica o e-mail real que foi passado e valida as configurações SMPT que são obrigatórias se `--env_type` é como `prod`. `Letsencrypt` usa o e-mail para notificar problemas no certificado `SSL`.
- `--geonodepwd`: A senha do administrador GeoNode. Um valor aleatório é dado, caso o valor não seja informado ou seja limpo.
- `--geoserverpwd`: A senha do administrador GeoNode. Um valor aleatório é dado, caso o valor não seja informado ou seja limpo.
- `--pgpwd`: A senha do administrador PostgreSQL. Um valor aleatório é dado, caso o valor não seja informado ou seja limpo.
- `--dbpwd`: A senha de um usuário dos bancos GeoNode (Esse banco é criado por **você** e se chama `geonode`). Um valor aleatório é dado, caso o valor não seja informado ou seja limpo.
- `--geodbpwd`: A senha de um usuário dos bancos GeoNode (Esse banco é criado por **você** e se chama `geonode_data`). Um valor aleatório é dado, caso o valor não seja informado ou seja limpo.
- `--clientid`: ID do cliente GeoNode `Oauth2` do GeoServer servidor. Um valor aleatório é dado, caso o valor não seja informado ou seja limpo.
- `--clientsecret`: A `secret` do cliente GeoNode `Oauth2` do GeoServer servidor. Um valor aleatório é dado, caso o valor não seja informado ou seja limpo.

> Certifique-se que você está dentro da pasta `geonode`.

## Como executar?

```bash
  docker compose build
  docker compose up -d
```

> Certifique-se que você está dentro da pasta `geonode`.
