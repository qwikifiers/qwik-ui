import { usePagination } from '@/packages/kit-headless/src/components/pagination/use-pagination';

it(`Given totalPages = 1
    AND siblingCount = 1
    AND different 'selectedPage'
    THEN it does display the correct amount of items
  `, () => {
  const tests: [number, (number | string)[]][] = [
    [1, [1, 2, 3, 4, '...', 10]],
    [2, [1, 2, 3, 4, '...', 10]],
    [3, [1, 2, 3, 4, '...', 10]],
    [4, [1, '...', 3, 4, 5, '...', 10]],
    [5, [1, '...', 4, 5, 6, '...', 10]],
    [6, [1, '...', 5, 6, 7, '...', 10]],
    [7, [1, '...', 6, 7, 8, '...', 10]],
    [8, [1, '...', 7, 8, 9, 10]],
    [9, [1, '...', 7, 8, 9, 10]],
    [10, [1, '...', 7, 8, 9, 10]],
  ];

  tests.forEach(([selectedPage, expectedResult]) => {
    testItems(usePagination(10, selectedPage, 1, 1), expectedResult);
  });
});

it(`Given totalPages = 1
    AND siblingCount = 2
    AND different 'selectedPage'
    THEN it does display the correct amount of items
  `, () => {
  const tests: [number, (number | string)[]][] = [
    [1, [1, 2, 3, 4, 5, '...', 10]],
    [2, [1, 2, 3, 4, 5, '...', 10]],
    [3, [1, 2, 3, 4, 5, '...', 10]],
    [4, [1, 2, 3, 4, 5, '...', 10]],
    [5, [1, '...', 3, 4, 5, 6, 7, '...', 10]],
    [6, [1, '...', 4, 5, 6, 7, 8, '...', 10]],
    [7, [1, '...', 6, 7, 8, 9, 10]],
    [8, [1, '...', 6, 7, 8, 9, 10]],
    [9, [1, '...', 6, 7, 8, 9, 10]],
    [10, [1, '...', 6, 7, 8, 9, 10]],
  ];

  tests.forEach(([selectedPage, expectedResult]) => {
    testItems(usePagination(10, selectedPage, 2, 1), expectedResult);
  });
});

/**
 * Helper to check if the generated items are exactly what is expected
 * @param generatedResult
 * @param expectedResult
 */
function testItems(
  generatedResult: (string | number)[],
  expectedResult: (string | number)[],
) {
  expect(generatedResult).to.have.length(expectedResult.length);
  expect(generatedResult).to.eql(expectedResult);
}
