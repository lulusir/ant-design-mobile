import React, { useState, useRef, FC } from 'react'
import classNames from 'classnames'
import Input, { InputRef } from '../input'
import { ElementProps } from '../../utils/element-props'
import { mergeProps } from '../../utils/with-default-props'
import { SearchOutlined } from '@ant-design/icons'
import { useNewControllableValue } from '../../utils/use-controllable-value'

const classPrefix = `adm-search`

export type SearchProps = {
  value?: string
  defaultValue?: string
  maxLength?: number
  placeholder?: string
  clearable?: boolean
  showCancelButton?: boolean
  onSearch?: (val: string) => void
  onChange?: (val: string) => void
  onFocus?: () => void
  onBlur?: () => void
  onClear?: () => void
  onCancel?: () => void
} & ElementProps<'--background' | '--border-radius' | '--placeholder-color'>

const defaultProps = {
  clearable: true,
  showCancelButton: false,
  defaultValue: '',
}

export const Search: FC<SearchProps> = p => {
  const props = mergeProps(defaultProps, p)
  const [value, setValue] = useNewControllableValue(props)
  const [hasFocus, setHasFocus] = useState(false)
  const inputRef = useRef<InputRef>(null)

  return (
    <div
      className={classNames(classPrefix, props.className, {
        [`${classPrefix}-active`]: hasFocus,
      })}
      style={props.style}
    >
      <form
        className={`${classPrefix}-input-box`}
        action='/'
        onSubmit={e => {
          e.preventDefault()
          e.stopPropagation()
          inputRef.current?.blur()
          props.onSearch?.(value)
        }}
      >
        <div className={`${classPrefix}-input-box-icon`}>
          <SearchOutlined />
        </div>
        <Input
          ref={inputRef}
          className={`${classPrefix}-input`}
          value={value}
          onChange={setValue}
          maxLength={props.maxLength}
          placeholder={props.placeholder}
          clearable={props.clearable}
          onFocus={() => {
            setHasFocus(true)
            props.onFocus?.()
          }}
          onBlur={() => {
            setHasFocus(false)
            props.onBlur?.()
          }}
          onClear={props.onClear}
          type='search'
        />
      </form>
      {props.showCancelButton && hasFocus && (
        <div className={`${classPrefix}-suffix`}>
          <a
            onMouseDown={e => {
              e.preventDefault()
            }}
            onTouchStart={e => {
              e.preventDefault()
            }}
            onClick={() => {
              inputRef.current?.clear()
              inputRef.current?.blur()
              props.onCancel?.()
            }}
          >
            取消
          </a>
        </div>
      )}
    </div>
  )
}
