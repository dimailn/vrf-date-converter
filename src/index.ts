import {Effect} from 'vrf'
import serializeDatesFactory from './serialize-dates-factory'
import defaultPostfixes from './default-postfixes'
import parseDatesFactory from './parse-dates-factory'

export default (
  {
    postfixes = (postfixes) => postfixes,
    parseDateConverter = (date) => new Date(date),
    serializeDateConverter = (value) => value.toISOString()
  } : {
    postfixes?: (postfixes: Array<string>) => Array<string>
    parseDateConverter?: (serializedDate: string | number) => Date
    serializeDateConverter?: (date: Date | any) => string
  } = {}
) => {
  return {
    name: 'date-converter',
    effect({onAfterLoad, onBeforeSave}){
      const preparedPostfixes = postfixes(defaultPostfixes)

      const parseDates = parseDatesFactory(preparedPostfixes, parseDateConverter)
      const serializeDates = serializeDatesFactory(preparedPostfixes, serializeDateConverter)

      onAfterLoad(event => parseDates(event.payload.resource))
      onBeforeSave(event => serializeDates(event.payload.resource))
    }
  } as Effect
}