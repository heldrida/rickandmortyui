import { paginator } from './pagination';

describe('Paginator is valid', () => {
  test('when the current index is 1, in a total of 100', () => {
    const expected = [1, 2, 3, 4, 5, -1, 100]
    const result = paginator({
      total: 100,
      range: 5,
      currentIndex: 1,
    })
    expect(expected).toEqual(result);
  });

  test('when the current index is 98, in a total of 100', () => {
    const expected = [98, 99, 100]
    const result = paginator({
      total: 100,
      range: 5,
      currentIndex: 98,
    })
    expect(expected).toEqual(result);
  });

  test('when the current index is 197, in a total of 571', () => {
    const expected = [197, 198, 199, -1, 571]
    const result = paginator({
      total: 571,
      range: 3,
      currentIndex: 197,
    })
    expect(expected).toEqual(result);
  });

  test('when the current index is 3, in a total of 34', () => {
    const expected = [3, 4, 5, 6, 7, -1, 34]
    const result = paginator({
      total: 34,
      range: 5,
      currentIndex: 3,
    })
    expect(expected).toEqual(result);
  });
})

describe("Paginator throws", () => {
  test('throws unexpected error', () => {
    const cb = () =>
      paginator({
        total: 1,
        range: 3,
        currentIndex: 197,
      })

    expect(cb).toThrow('Paginator failure: Unexpected input!')
  });
})
