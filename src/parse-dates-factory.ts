import set from 'lodash.set'
import RecursiveIterator from 'recursive-iterator'

export default (postfixes: Array<string>, converter: (serializedDate: string | number) => Date) => (entity) => {
  const parsedEntity = {}

  const iterator = new RecursiveIterator(entity)

  for(let {node, path} of iterator){
    if((postfixes.some(p => RegExp("\\w+" + p + "$").test(path[path.length - 1]) )) && typeof node === 'string')
      node = converter(node)
    
      set(parsedEntity, path, node)
  }

  return parsedEntity
}

