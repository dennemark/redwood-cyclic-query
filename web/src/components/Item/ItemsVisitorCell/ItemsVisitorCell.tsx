import type { FindItems } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellFailureProps, CellSuccessProps } from '@redwoodjs/web'

import Items from 'src/components/Item/Items'

export const QUERY = gql`
  query FindItemsVisitor {
    itemsVisitor {
      id
      public
      itemId
      item {
        id
        public
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No items yet. '}
      <Link to={routes.newItem()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ itemsVisitor }: CellSuccessProps<FindItems>) => {
  return <Items items={itemsVisitor} />
}
