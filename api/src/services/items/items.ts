import type {
  ItemRelationResolvers,
  MutationResolvers,
  QueryResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const items: QueryResolvers['items'] = () => {
  return db.item.findMany()
}
export const itemsVisitor: QueryResolvers['itemsVisitor'] = () => {
  return db.item.findMany({
    where: {
      public: true,
    },
    select: {
      id: true,
      public: true,
      item: false,
    },
  })
}
export const item: QueryResolvers['item'] = ({ id }) => {
  return db.item.findUnique({
    where: { id },
  })
}

export const createItem: MutationResolvers['createItem'] = ({ input }) => {
  return db.item.create({
    data: input,
  })
}

export const updateItem: MutationResolvers['updateItem'] = ({ id, input }) => {
  return db.item.update({
    data: input,
    where: { id },
  })
}

export const deleteItem: MutationResolvers['deleteItem'] = ({ id }) => {
  return db.item.delete({
    where: { id },
  })
}

export const Item: ItemRelationResolvers = {
  item: (_obj, { root }) => {
    return root.item //?? db.item.findUnique({ where: { id: root?.id } }).item()
  },
  related: (_obj, { root }) => {
    return db.item.findUnique({ where: { id: root?.id } }).related()
  },
}
