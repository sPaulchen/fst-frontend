import React, { useEffect } from 'react'

import { TextField } from '@mui/material'

import TextInputTrash from './TextInputTrash'
import LabelWithTooltipComponent from './LabelWithTooltipComponent'

interface Props {
  label: string
  description?: string
  value?: string | number
  required?: boolean
  multiline?: boolean
  minRows?: number
  maxRows?: number
  type?: TextFieldType
  disabled?: boolean
  clearable?: boolean
  fullWidth?: boolean
  onChange?: (value?: string | number) => void
}

export enum TextFieldType {
  text = 'text',
  number = 'number',
  password = 'password',
}

export type TextFieldSettings = {
  color: 'primary' | 'secondary'
  disabled: boolean
  variant: 'outlined' | 'filled'
  type: TextFieldType
  margin: 'dense' | 'none' | 'normal'
}

export const defaultSettings: TextFieldSettings = {
  color: 'primary',
  disabled: false,
  variant: 'outlined',
  type: TextFieldType.text,
  margin: 'dense',
}

const TextInputComponent: React.FC<Props> = (props) => {
  const variant: 'outlined' | 'filled' = defaultSettings.variant
  const margin: 'normal' | 'dense' | 'none' = defaultSettings.margin
  const type = props.type || defaultSettings.type

  const label = props.label
  const description = props.description

  const multiline = props.multiline || false
  const required = props.required ? props.required : false
  const disabled = props.disabled ? props.disabled : false

  const [value, setValue] = React.useState<string | number>()

  useEffect(() => {
    props.value && setValue(props.value)
  }, [props.value])

  const onTrashClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setValue('')
    props.onChange && props.onChange()
  }

  return (
    <>
      <TextField
        InputProps={{
          endAdornment: (
            <>
              {((props.clearable && value) || (!required && value && !disabled)) &&
                <TextInputTrash onTrashClick={(event: React.MouseEvent) => onTrashClick(event)} />}
            </>
          ),
          readOnly: disabled,
          disabled: disabled,
        }}
        aria-label={label}
        label={
          <LabelWithTooltipComponent
            label={label}
            description={description}
          />
        }
        InputLabelProps={{
          shrink: true,
          style: { pointerEvents: 'auto', display: 'flex', alignItems: 'center' },
        }}
        variant={variant}
        required={required}
        disabled={disabled}
        type={type}
        minRows={multiline ? (props.minRows || 8) : 1}
        maxRows={multiline ? (props.maxRows || 8) : 1}
        sx={{
          width: props.fullWidth ? '100%' : '300px',
        }}
        margin={margin}
        autoFocus={false}
        multiline={multiline}
        value={value}
        onChange={(event => {
          setValue(event.target.value)
          props.onChange && props.onChange(event.target.value)
        })}
      />
    </>
  )
}

export default TextInputComponent
