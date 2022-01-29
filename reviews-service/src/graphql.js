import prismaclient from '@prisma/client'
const { PrismaClient } = prismaclient

const prisma = new PrismaClient({rejectOnNotFound: true })

export const schema = `

    extend type Product @key(fields: "id") {
        id: ID! @external
        reviews: [Review!]!
    }

    type Review @key(fields: "id") {
        id: ID!
        text: String!
        product: Product!
    }

    extend type Query {
        review(id: ID!): Review!
    }

    extend type Mutation {
        createReview(productId: ID!, text: String!): Review!
    }
`

export const resolvers = {
  Review: {
        __resolveReference: async (review) => {
            const data = await prisma.review.findUnique({ where: { id: review.id } })
            return {...data, product: { id: data.productId } }
        }
    },
    Product: {
        reviews: async (product) => {
            const data = await prisma.review.findMany({ where: { productId: product.id } })
            return data.map(x => ({...x, product: { id: x.productId } }))
        }
    },
    Query: {
        review: async (_, args) => {
            const data = await prisma.review.findUnique({ where: { id: args.id } })
            return {...data, product: { id: data.productId } }
        }
    },
    Mutation: {
        createReview: async (_, args) => {
            const data = await prisma.review.create({ data: args })
            return {...data, product: { id: data.productId } }
        }
    }
}
