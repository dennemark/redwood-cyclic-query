import ItemsCell from 'src/components/Item/ItemsCell'
import ItemsVisitorCell from 'src/components/Item/ItemsVisitorCell'

const ItemsPage = () => {
  return (
    <>
      User should see all
      <br />
      <ItemsCell />
      <br />
      Visitor should only see public <br />
      <ItemsVisitorCell />
    </>
  )
}

export default ItemsPage
