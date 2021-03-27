import {
  getRouteValue,
  getRouteSearchQuery,
  pathnameMatchReplacer,
  extractRouteParams,
} from './';

describe('Router', () => {
  describe('getRouteValue returns valid data', () => {
    test('when uri is `/page/6` provides a valid page number', () => {
      const expected = "6"
      const result = getRouteValue({
        name: 'page',
        pathname: '/page/6'
      })
      expect(expected).toEqual(result);
    })
    test('when uri is `/page/100` provides a valid page number', () => {
      const expected = "100"
      const result = getRouteValue({
        name: 'page',
        pathname: '/page/100'
      })
      expect(expected).toEqual(result);
    })
    test('when pathname is empty provides a fallback value', () => {
      const expected = "1"
      const result = getRouteValue({
        name: 'page',
        pathname: '',
        fallbackValue: "1",
      })
      expect(expected).toEqual(result);
    })
    test('when a callback is passed, computes the value', () => {
      const expected = "Hello 123"
      const result = getRouteValue({
        name: 'page',
        pathname: '',
        fallbackValue: "1",
        callback: (val: string) => 'Hello 123'
      })
      expect(expected).toEqual(result);
    })
  })

  describe('getRouteValue when invalid', () => {
    test('throws unexpected error', () => {
      const cb = () =>
        getRouteValue({
          name: 'pages',
          pathname: '/page/3'
        })
  
      expect(cb).toThrow('GetRouteValue failure: invalid request named pages')
    });
  })

  describe('getRouteSearchQuery returns valid data', () => {
    test('when there is a valid search query with no special characters', () => {
      const expected = { name: "peter", gender: "male", status: "alive"}
      const result = getRouteSearchQuery({
        search: 'name=peter&gender=male&status=alive'
      })
      expect(expected).toEqual(result);
    })

    test('when there is a valid search query with special white-space characters', () => {
      const expected = { name: "peter brownies", gender: "male", status: "alive"}
      const result = getRouteSearchQuery({
        search: 'name=peter%20brownies&gender=male&status=alive'
      })
      expect(expected).toEqual(result);
    })
  })

  describe('getRouteSearchQuery when invalid', () => {
    test('throws unexpected error', () => {
      const cb = () =>
        getRouteSearchQuery({
          search: ''
        })
  
      expect(cb).toThrow('GetRouteSearchQuery failure: invalid request!')
    });

    test('provides fallback value on failure', () => {
      const expected: string[] = []
      const result = getRouteSearchQuery({
        search: '',
        fallbackValue: []
      })
  
      expect(expected).toEqual(result);
    });
  })
})

describe('PathnameMatchReplacer returns valid data', () => {
  test('when there are corresponding matches', () => {
    const expected = "/page/([0-9].*)"
    const result = pathnameMatchReplacer("/page/:num")
    expect(result).toBe(expected)
  })
  test('when there\'re no matches', () => {
    const expected = "/page/page/:nope"
    const result = pathnameMatchReplacer("/page/page/:nope")
    expect(result).toBe(expected)
  })
  test('when there\'s a typo', () => {
    const expected = "/page/:nums"
    const result = pathnameMatchReplacer("/page/:nums")
    expect(result).toBe(expected)
  })
})

describe('ExtractRouteParams provides the parameters', () => {
  test('when the path is simple', () => {
    const expected = { page: 1 }
    const result = extractRouteParams('/page/1')
    expect(result).toBe(result)
  })
  test('when the path has a search query', () => {
    const expected = { page: 7 }
    const result = extractRouteParams('/page/7?name=bob&status=unknown&gender=female')
    expect(result).toBe(result)
  })
})