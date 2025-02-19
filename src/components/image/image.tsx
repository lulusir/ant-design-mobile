import { mergeProps } from '../../utils/with-default-props'
import React, { FC, ReactNode, useState } from 'react'
import { ElementProps } from '../../utils/element-props'
import classNames from 'classnames'
import { PictureOutlined, DisconnectOutlined } from '@ant-design/icons'

const classPrefix = `adm-image`

export type ImageProps = {
  src: string
  alt?: string
  width?: number | string
  height?: number | string
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  placeholder?: ReactNode
  fallback?: ReactNode
  onClick?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void
} & ElementProps &
  Pick<
    React.ImgHTMLAttributes<HTMLImageElement>,
    | 'crossOrigin'
    | 'decoding'
    | 'loading'
    | 'referrerPolicy'
    | 'sizes'
    | 'srcSet'
    | 'useMap'
  >

const defaultProps = {
  fit: 'fill',
  placeholder: (
    <div className={`${classPrefix}-tip`}>
      <PictureOutlined />
    </div>
  ),
  fallback: (
    <div className={`${classPrefix}-tip`}>
      <DisconnectOutlined />
    </div>
  ),
}

export const Image: FC<ImageProps> = p => {
  const props = mergeProps(defaultProps, p)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  function renderInner() {
    if (failed) {
      return props.fallback
    }
    return (
      <>
        {!loaded && props.placeholder}
        <img
          className={`${classPrefix}-img`}
          src={props.src}
          alt={props.alt}
          onClick={props.onClick}
          onLoad={() => {
            setLoaded(true)
          }}
          onError={e => {
            setFailed(true)
            props.onError?.(e)
          }}
          style={{
            objectFit: props.fit,
            display: loaded ? 'block' : 'none',
          }}
          crossOrigin={props.crossOrigin}
          decoding={props.decoding}
          loading={props.loading}
          referrerPolicy={props.referrerPolicy}
          sizes={props.sizes}
          srcSet={props.srcSet}
          useMap={props.useMap}
        />
      </>
    )
  }

  return (
    <div
      className={classNames(classPrefix, props.className)}
      style={{
        width: props.width,
        height: props.height,
        ...props.style,
      }}
    >
      {renderInner()}
    </div>
  )
}
