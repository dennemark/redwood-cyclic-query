import {
  Form,
  FormError,
  FieldError,
  Label,
  CheckboxField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'

import type { EditItemById, UpdateItemInput } from 'types/graphql'
import type { RWGqlError } from '@redwoodjs/forms'

type FormItem = NonNullable<EditItemById['item']>

interface ItemFormProps {
  item?: EditItemById['item']
  onSave: (data: UpdateItemInput, id?: FormItem['id']) => void
  error: RWGqlError
  loading: boolean
}

const ItemForm = (props: ItemFormProps) => {
  const onSubmit = (data: FormItem) => {
    props.onSave(data, props?.item?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormItem> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="public"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Public
        </Label>

        <CheckboxField
          name="public"
          defaultChecked={props.item?.public}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
        />

        <FieldError name="public" className="rw-field-error" />

        <Label
          name="itemId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Item id
        </Label>

        <NumberField
          name="itemId"
          defaultValue={props.item?.itemId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          emptyAs={'undefined'}
        />

        <FieldError name="itemId" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default ItemForm
