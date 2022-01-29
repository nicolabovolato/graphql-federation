import dotenv from 'dotenv'
import mercurius from 'mercurius'
import fastify from 'fastify'

dotenv.config()

import { schema, resolvers } from './graphql.js'

const server = new fastify({ logger: true })

server.register(mercurius, { schema, resolvers, federationMetadata: true })

server.listen(process.env.PORT || 3000, '0.0.0.0')
.catch( err => {
    server.log.error(err)
    process.exit(1)
})
