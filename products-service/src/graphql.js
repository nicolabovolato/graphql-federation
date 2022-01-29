import prismaclient from '@prisma/client'
const { PrismaClient } = prismaclient

const prisma = new PrismaClient({rejectOnNotFound: true})

export const schema = `

    type Product @key(fields: "id") {
        id: ID!
        name: String!
        description: String!
        price: Float!
        category: Category!
    }

    type Category @key(fields: "id") {
        id: ID!
        name: String!
    }

    extend type Query {
        products: [Product!]!
        product(id: ID!): Product!
        
        categories: [Category!]!
        category(id: ID!): Category!
    
    }

    extend type Mutation {
        createCategory(name: String!): Category!
        createProduct(name: String!, description: String, price: Float!, categoryId: ID!): Product!

        updateCategory(id: ID!, name: String!): Category!
        updateProduct(id: ID!, name: String, description: String, price: Float, categoryId: ID): Product!
        
        deleteCategory(id: ID!): Category!
        deleteProduct(id: ID!): Product!
    }
`

export const resolvers = {
    Product: {
        __resolveReference: async (product) => await prisma.product.findUnique({ where: { id: product.id }, include: { category: true } })
    },
    Category: {
        __resolveReference: async (category) => await prisma.category.findUnique({ where: { id: category.id } })
    },
    Query: {
        categories: async () => prisma.category.findMany(),
        products:   async () => prisma.product.findMany({ include: { category: true } }),

        category: async (_, args) => prisma.category.findUnique({ where: { id: args.id } }),
        product:  async (_, args) => prisma.product.findUnique({ where: { id: args.id }, include: { category: true } })
    },
    Mutation: {
        createCategory: async (_, args) => prisma.category.create({ data: args }),
        createProduct:  async (_, args) => prisma.product.create({ data: args, include: { category: true } }),

        updateCategory: async (_, args) =>prisma.category.update({ where: { id: args.id }, data: args }),
        updateProduct:  async (_, args) => prisma.product.update({ where: { id: args.id }, data: args, include: { category: true } }),

        deleteCategory: async (_, args) => prisma.category.delete({ where: { id: args.id } }),
        deleteProduct:  async (_, args) => prisma.product.delete({ where: { id: args.id }, include: { category: true } }),
    }
}
