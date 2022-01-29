import dotenv from 'dotenv'
import mercurius from 'mercurius'
import fastify from 'fastify'

dotenv.config()

const server = new fastify({ logger: true })

server.register(mercurius, { 
    gateway: {
        services: [
            {
                name: 'products',
                url: process.env.PRODUCTS_SERVICE_GRAPHQL_ENDPOINT
            },
            {
                name: 'reviews',
                url: process.env.REVIEWS_SERVICE_GRAPHQL_ENDPOINT
            }
        ]
    },
    pollingInterval: process.env.POLLING_INTERVAL
})

server.listen(process.env.PORT || 3000, '0.0.0.0')
.catch( err => {
    server.log.error(err)
    process.exit(1)
})
