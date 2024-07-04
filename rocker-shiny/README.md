# Rocker Shiny

Este é o projeto Rocker Shiny. Um servidor Shiny para aplicações feitas em `R`.

## Como preparar o ambiente (Produção)?

Primeiro vamos executar o projeto no Docker que está no servidor.

```bash
  cd /home/projects/LEMA/rocker-shiny
  docker build -t shiny-server .
  docker-compose up -d

  cd /etc/nginx/sites-available
  nano rocker-shiny
```

### Instalação do Docker e definição de usuário:

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

### Instalação do Docker

```bash
  sudo apt update
  sudo apt install nginx
```

### Adicionar configurações Nginx:

```conf
  # This is Nginx configuration for Rocker Shiny.
  server {
    listen 85.31.60.110; # Irá ser mudado futuramente.

    location / {
      proxy_http_version 1.1;
      proxy_set_header Upgrade $http_upgrade;
      proxy_set_header Connection 'upgrade';
      proxy_set_header Host $host;
      proxy_cache_bypass $http_upgrade;
      proxy_hide_header X-Powered-By;
      proxy_pass http://localhost:3838;
    }
  }
```

## Como preparar o ambiente (Local)?

1. Você **deve** possuir o [Docker Desktop](https://docs.docker.com/) instalado em sua máquina.
2. (**Apenas para usuários Windows**) É **essencial** ter o ambiente [WSL](https://learn.microsoft.com/pt-br/windows/wsl/install) instalado na sua máquina.
3. (**Apenas para usuários Windows**) Por fim, é **obrigatório** possuir a opção _Virtualization_ habilitada.

## Setup Shiny

```bash
  docker build -t shiny-server .
```

> Certifique-se que você está dentro da pasta `rocker-shiny`.

## Como executar?

```bash
  docker-compose up -d
```

> Certifique-se que você está dentro da pasta `rocker-shiny`.
