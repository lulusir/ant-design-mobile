import {FileItem} from '.'

export type UploaderResultType = 'dataUrl' | 'text' | 'file'

export type PromiseOrNot<T> = T | Promise<T>

export function readFileContent(file: File, resultType: UploaderResultType) {
  return new Promise<string | void>(resolve => {
    if (resultType === 'file') {
      resolve()
      return
    }

    const reader = new FileReader()

    reader.onload = event => {
      resolve((event.target as FileReader).result as string)
    }

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file)
    } else if (resultType === 'text') {
      reader.readAsText(file)
    }
  })
}

export function toArray<T>(item: T | T[]): T[] {
  if (Array.isArray(item)) {
    return item
  }

  return [item]
}

export function isOversize(
  items: FileItem | FileItem[],
  maxSize: number
): boolean {
  return toArray(items).some(item => {
    if (item.file) {
      return item.file.size > maxSize
    }
    return false
  })
}

export function getOverCount(
  maxCount: number,
  fileList: FileItem[],
  files: File[]
) {
  const remainCount = maxCount! - fileList?.length!

  return remainCount - files.length
}