import 'dotenv/config';

import fastify from 'fastify';
import fastifyView from '@fastify/view';
import path from 'path';
import ejs from 'ejs';

const app = fastify({ logger: true });

app.register(fastifyView, {
  root: path.join(__dirname, '../public'),
  engine: {
    ejs,
  },
});

app.get('/', (_, reply) => reply.view('index.ejs'));

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 8080;

app.listen({ host: process.env.HOST || 'localhost', port });
