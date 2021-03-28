import { querySearchTerms } from './url'

describe('QuerySearchTerms has valid results', () => {
  test('when the input has key paired values', () => {
    const expected = "field1=value1&field2=value2&field3=value3"
    const data = {
      field1: "value1",
      field2: "value2",
      field3: "value3",
    }
    const result = querySearchTerms(data)
    expect(result).toBe(expected)
  })
  test('when the object has empty fields', () => {
    const expected = "field1=value1&field3=value3"
    const data = {
      field1: "value1",
      field2: "",
      field3: "value3",
    }
    const result = querySearchTerms(data)
    expect(result).toBe(expected)
  })
  test('when the object has invalid values', () => {
    const expected = "field3=value3"
    const data = {
      field1: undefined,
      field2: "",
      field3: "value3",
    }
    const result = querySearchTerms(data)
    expect(result).toBe(expected)
  })
  test('when there are white-space', () => {
    const expected = "field1=my%20value%20here&field2=value2&field3=value3"
    const data = {
      field1: "my value here",
      field2: "value2",
      field3: "value3",
    }
    const result = querySearchTerms(data)
    expect(result).toBe(expected)
  })
  test('when there are special-characters', () => {
    const expected = "field1=my%20value%20here!!?&field2=value2&field3=value3;)"
    const data = {
      field1: "my value here!!?",
      field2: "value2",
      field3: "value3;)",
    }
    const result = querySearchTerms(data)
    expect(result).toBe(expected)
  })
})