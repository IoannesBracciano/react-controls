export { default as Button, ButtonProps } from './Button'

export type Indexed<T> = T & {
  readonly position: number
  readonly purged: boolean
}

export interface Collection<
  T extends { [key in K]: string },
  K extends keyof T
> {
  readonly key: K
  // readonly items: Record<K, T>
  readonly items: T[]
  index: Record<T[K], number>
  readonly length: number
}

export function createCollection<
  T extends { [key in K]: string },
  K extends keyof T
>(key: K, items: T[] = []): Collection<T, K> {
  return {
    key,
    // items: items.reduce((acc, item) => {
    //   acc[item[key]] = item
    //   return acc
    // }, {} as Record<K, T>),
    items,
    index: items.reduce((acc, item, i) => {
      acc[item[key]] = i
      return acc
    }, {} as Record<T[K], number>),
    get length() {
      return Object.keys(this.items).length
    }
  }
}

type Item = {
  id: string
  name: string
  lastModified: number
}

const items: Item[] = [
  {
    id: '1',
    name: 'foo',
    lastModified: 1234567890
  },
  {
    id: '2',
    name: 'bar',
    lastModified: 1234567890
  }
]

const collection = createCollection('id', items)
