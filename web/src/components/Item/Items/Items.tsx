import type { DeleteItemMutationVariables, FindItems } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Item/ItemsCell'
import { checkboxInputTag, truncate } from 'src/lib/formatters'

const DELETE_ITEM_MUTATION = gql`
  mutation DeleteItemMutation($id: Int!) {
    deleteItem(id: $id) {
      id
    }
  }
`

const ItemsList = ({ items }: FindItems) => {
  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => {
      toast.success('Item deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteItemMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete item ' + id + '?')) {
      deleteItem({ variables: { id } })
    }
  }
  console.log({ items })
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Public</th>
            <th>Item id</th>
            <th>Related Id</th>
            <th>Related Public</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{truncate(item.id)}</td>
              <td>{checkboxInputTag(item.public)}</td>
              <td>{truncate(item.itemId)}</td>
              <td>{item.item?.id}</td>
              <td>{checkboxInputTag(item.item?.public)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.item({ id: item.id })}
                    title={'Show item ' + item.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editItem({ id: item.id })}
                    title={'Edit item ' + item.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete item ' + item.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(item.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ItemsList
