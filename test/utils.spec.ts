import { describe, test, expect } from 'vitest';

import { isPointInsideShape, isPointOnShapeBorder } from '@/utils';

describe('test isPointInsideShape', () => {
  test('check if it works on rectangle', () => {
    expect(
      isPointInsideShape(
        { x: 1, y: 1 },
        {
          type: 'rectangle',
          left: 0,
          top: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(true);

    expect(
      isPointInsideShape(
        { x: 45, y: 3 },
        {
          type: 'rectangle',
          left: 0,
          top: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(false);
  });

  test('check if it works on circle', () => {
    expect(
      isPointInsideShape(
        { x: 5, y: 10 },
        {
          type: 'circle',
          centerX: 10,
          centerY: 10,
          radius: 10,
        },
      ),
    ).equal(true);

    expect(
      isPointInsideShape(
        { x: 5, y: 5 },
        {
          type: 'circle',
          centerX: 10,
          centerY: 10,
          radius: 10,
        },
      ),
    ).equal(true);

    expect(
      isPointInsideShape(
        { x: 5, y: 1 },
        {
          type: 'circle',
          centerX: 10,
          centerY: 10,
          radius: 10,
        },
      ),
    ).equal(false);
  });
});

describe('test isPointOnShapeBorder', () => {
  test('check if it works on rectangle', () => {
    expect(
      isPointOnShapeBorder(
        { x: 0, y: 5 },
        {
          type: 'rectangle',
          left: 0,
          top: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(true);

    expect(
      isPointOnShapeBorder(
        { x: 5, y: 5 },
        {
          type: 'rectangle',
          left: 0,
          top: 0,
          width: 20,
          height: 20,
        },
      ),
    ).equal(false);
  });

  test('check if it works on circle', () => {
    expect(
      isPointOnShapeBorder(
        { x: 20, y: 10 },
        {
          type: 'circle',
          centerX: 10,
          centerY: 10,
          radius: 10,
        },
      ),
    ).equal(true);

    expect(
      isPointOnShapeBorder(
        { x: 13.09, y: 19.51 },
        {
          type: 'circle',
          centerX: 10,
          centerY: 10,
          radius: 10,
        },
      ),
    ).equal(true);
    //

    expect(
      isPointOnShapeBorder(
        { x: 20, y: 20 },
        {
          type: 'circle',
          centerX: 10,
          centerY: 10,
          radius: 10,
        },
      ),
    ).equal(false);
  });
});
