export const schema = gql`
  type Item {
    id: Int!
    public: Boolean! @requireAuth
    itemId: Int
    item: Item
    related: Item
  }

  type Query {
    items: [Item!]! @requireAuth
    itemsVisitor: [Item!]! @skipAuth
    item(id: Int!): Item @requireAuth
  }

  input CreateItemInput {
    public: Boolean!
    itemId: Int
  }

  input UpdateItemInput {
    public: Boolean
    itemId: Int
  }

  type Mutation {
    createItem(input: CreateItemInput!): Item! @requireAuth
    updateItem(id: Int!, input: UpdateItemInput!): Item! @requireAuth
    deleteItem(id: Int!): Item! @requireAuth
  }
`
