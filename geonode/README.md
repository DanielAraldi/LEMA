# GeoNode

Este é o projeto GeoNode. Gerado a partir de um projeto `django` com suporte ao GeoNode.

## Como começar?

Está etapa só **deve ser realizada** caso a sua máquina/servidor tenha o GeoNode instalado pela **primeira vez**!

### Instalações de bibliotecas para o SO Ubuntu 22.04:

```bash
  sudo add-apt-repository universe
  sudo apt-get update -y
  sudo apt-get install -y git-core git-buildpackage debhelper devscripts python3.10-dev python3.10-venv virtualenvwrapper
  sudo apt-get install -y apt-transport-https ca-certificates curl lsb-release gnupg gnupg-agent software-properties-common vim
```

### Instalação do Docker e definição de usuário:

> Faça esta etapa caso o Docker não esteja instalado no servidor.

```bash
  sudo mkdir -p /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  sudo chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

  sudo apt-get update -y
  sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose
  sudo apt autoremove --purge

  sudo usermod -aG docker ${USER}
  su ${USER}
```

### Instalação do PostgreSQL e PostGis:

> Faça esta etapa caso o PostgreSQL ou PostGis não esteja instalado no servidor.

```bash
  sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
  sudo wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
  sudo apt update -y; sudo apt install -y postgresql-13 postgresql-13-postgis-3 postgresql-13-postgis-3-scripts postgresql-13 postgresql-client-13

  sudo service postgresql start
  sudo -u postgres createuser -P geonode # Use a senha: geonode

  # Iniciando o serviço PostgreSQL.
  sudo service postgresql start
  sudo -u postgres createuser -P geonode # Use a senha: geonode

  # Criação das tabelas "geonode" e "geonode_data" no banco de dados PostgreSQL.
  sudo -u postgres createdb -O geonode geonode
  sudo -u postgres createdb -O geonode geonode_data

  # Criação da extensão PostGis.
  sudo -u postgres psql -d geonode -c 'CREATE EXTENSION postgis;'
  sudo -u postgres psql -d geonode -c 'GRANT ALL ON geometry_columns TO PUBLIC;'
  sudo -u postgres psql -d geonode -c 'GRANT ALL ON spatial_ref_sys TO PUBLIC;'
  sudo -u postgres psql -d geonode -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO geonode;'
  sudo -u postgres psql -d geonode -c 'GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO geonode;'

  sudo -u postgres psql -d geonode_data -c 'CREATE EXTENSION postgis;'
  sudo -u postgres psql -d geonode_data -c 'GRANT ALL ON geometry_columns TO PUBLIC;'
  sudo -u postgres psql -d geonode_data -c 'GRANT ALL ON spatial_ref_sys TO PUBLIC;'
  sudo -u postgres psql -d geonode_data -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO geonode;'
  sudo -u postgres psql -d geonode_data -c 'GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO geonode;'
```

### Acessar o arquivo de configurações do PostgreSQL:

```bash
  sudo vim /etc/postgresql/13/main/pg_hba.conf
```

Mudar as configurações do PostgreSQL para que fiquem iguais a essa:

```conf
  # ...
  # DO NOT DISABLE!
  # If you change this first entry you will need to make sure that the
  # database superuser can access the database using some other method.
  # Noninteractive access to all databases is required during automatic
  # maintenance (custom daily cronjobs, replication, and similar tasks).
  #
  # Database administrative login by Unix domain socket
  local   all             postgres                                trust

  # TYPE  DATABASE        USER            ADDRESS                 METHOD

  # "local" is for Unix domain socket connections only
  local   all             all                                     md5
  # IPv4 local connections:
  host    all             all             127.0.0.1/32            md5
  # IPv6 local connections:
  host    all             all             ::1/128                 md5
  # Allow replication connections from localhost, by a user with the
  # replication privilege.
  local   replication     all                                     peer
  host    replication     all             127.0.0.1/32            md5
  host    replication     all             ::1/128                 md5
```

Após mudar o arquivo você deve dar um `restart` no PostgreSQL para que ele recarregue as alterações feitas:

```bash
  sudo service postgresql restart
```

### Testar os usuários PostgreSQL (Opcional):

```bash
  psql -U postgres geonode # Não deverá pedir a senha, pois, é o super usuário do PostgreSQL.

  psql -U geonode geonode # Deverá pedir a senha, pois, é o usuário que você criou.

  # Recomendamos repitir o mesmo processo com o banco de dados "geonode_data".
  psql -U postgres geonode_data
  psql -U geonode geonode_data
```

## Como preparar o ambiente (Local)?

1. Você **deve** possuir o [Docker Desktop](https://docs.docker.com/) instalado em sua máquina.
2. (**Apenas para usuários Windows**) É **essencial** ter o ambiente [WSL](https://learn.microsoft.com/pt-br/windows/wsl/install) instalado na sua máquina.
3. (**Apenas para usuários Windows**) Por fim, é **obrigatório** possuir a opção _Virtualization_ habilitada.

```bash
  source /usr/share/virtualenvwrapper/virtualenvwrapper.sh
  mkvirtualenv --python=/usr/bin/python3 geonode

  pip install Django==3.2.13

  cd ./geonode
  python create-envfile.py --env_type=test --geonodepwd=abc123 --geoserverpwd=abc123 --pgpwd=postgres --dbpwd=geonode --geodbpwd=geonode
  # OU
  python3 create-envfile.py --env_type=test --geonodepwd=abc123 --geoserverpwd=abc123 --pgpwd=postgres --dbpwd=geonode --geodbpwd=geonode
```

> Certifique-se que você está na raiz do projeto.

## Como preparar o ambiente (Produção)?

```bash
  cd /home/projects/LEMA/geonode
  python create-envfile.py --https --env_type=prod --hostname=lemageonode.online --email=rsantana@univali.br --geonodepwd=abc123 --geoserverpwd=abc123 --pgpwd=postgres --dbpwd=geonode --geodbpwd=geonode
  # OU
  python3 create-envfile.py --https --env_type=prod --hostname=lemageonode.online --email=rsantana@univali.br --geonodepwd=abc123 --geoserverpwd=abc123 --pgpwd=postgres --dbpwd=geonode --geodbpwd=geonode

  nano .env
  HTTP_PORT=82 # Mudar o número dá porta de 80 para 82.
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
