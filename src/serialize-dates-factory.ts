import set from 'lodash.set'

const isMoment = value => value && !!value.isValid

export default (postfixes: Array<string>, converter: (date: Date | any) => string) => {
  const serializeDates = (entity) => {
    const preparedEntity = entity instanceof Array ? [] : {}

    Object.keys(entity).forEach((key) => {
      let value = entity[key]

      if((postfixes.some(p => RegExp("\\w+" + p + "$").test(key) )) && (isMoment(value) || value instanceof Date))
        value = converter(value)
      else if(typeof value === 'object' && value !== null && Object.isExtensible(value))
        value = serializeDates(value)

      set(preparedEntity, key, value)
    })

    return preparedEntity
  }

  return serializeDates
}

