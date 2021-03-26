import { getRouteValue } from './';

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
})
