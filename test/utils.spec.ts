import { describe, test, expect } from 'vitest';

import { isPointInsideElement, isPointOnElementBorder } from '@/utils';

describe('test isPointInsideElement', () => {
  test('check if it works on rectangle', () => {
    expect(
      isPointInsideElement(
        { x: 1, y: 1 },
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(true);

    expect(
      isPointInsideElement(
        { x: 45, y: 3 },
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(false);
  });

  test('check if it works on circle', () => {
    expect(
      isPointInsideElement(
        { x: 5, y: 10 },
        {
          type: 'circle',
          x: 0,
          y: 0,
          radius: 10,
        },
      ),
    ).equal(true);

    expect(
      isPointInsideElement(
        { x: 5, y: 5 },
        {
          type: 'circle',
          x: 0,
          y: 0,
          radius: 10,
        },
      ),
    ).equal(true);

    expect(
      isPointInsideElement(
        { x: 5, y: 1 },
        {
          type: 'circle',
          x: 0,
          y: 0,
          radius: 10,
        },
      ),
    ).equal(false);
  });
});

describe('test isPointOnElementBorder', () => {
  test('check if it works on rectangle', () => {
    expect(
      isPointOnElementBorder(
        { x: 0, y: 5 },
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(true);

    expect(
      isPointOnElementBorder(
        { x: 5, y: 5 },
        {
          type: 'rectangle',
          x: 0,
          y: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(false);
  });

  test('check if it works on circle', () => {
    expect(
      isPointOnElementBorder(
        { x: 20, y: 10 },
        {
          type: 'circle',
          x: 10,
          y: 10,
          radius: 10,
        },
      ),
    ).equal(true);

    expect(
      isPointOnElementBorder(
        { x: 13.09, y: 19.51 },
        {
          type: 'circle',
          x: 0,
          y: 0,
          radius: 10,
        },
      ),
    ).equal(true);

    expect(
      isPointOnElementBorder(
        { x: 20, y: 20 },
        {
          type: 'circle',
          x: 10,
          y: 10,
          radius: 10,
        },
      ),
    ).equal(false);
  });
});
