import { Coordinate, Element } from './type';

export const isPointInsideShape = (
  { x: pointX, y: pointY }: Coordinate,
  element: Element,
): boolean => {
  switch (element.type) {
    case 'rectangle':
    case 'text': {
      const { x, y, width, height } = element;

      return (
        pointX >= x &&
        pointX <= x + width &&
        pointY >= y &&
        pointY <= y + height
      );
    }

    case 'circle': {
      const { x, y, radius } = element;
      const centerX = x + radius;
      const centerY = y + radius;
      const dx = pointX - centerX;
      const dy = pointY - centerY;

      return dx * dx + dy * dy <= radius * radius;
    }

    case 'ellipse': {
      const { x, y, radiusX, radiusY } = element;
      const centerX = x + radiusX;
      const centerY = y + radiusY;
      const dx = pointX - centerX;
      const dy = pointY - centerY;

      return (
        (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1
      );
    }

    case 'image': {
      const { shape, ...rest } = element;
      const pointCoordinate = {
        x: pointX,
        y: pointY,
      };

      if (shape) {
        return isPointInsideShape(pointCoordinate, shape);
      }

      return isPointInsideShape(pointCoordinate, {
        ...rest,
        type: 'rectangle',
      });
    }
    default:
      throw new Error('Unsupported element type');
  }
};

export const isPointOnShapeBorder = (
  { x: pointX, y: pointY }: Coordinate,
  element: Element,
  tolerance = 2,
): boolean => {
  switch (element.type) {
    case 'rectangle':
    case 'text': {
      const { x, y, width, height } = element;

      const onLeft =
        Math.abs(pointX - x) <= tolerance &&
        pointY >= y &&
        pointY <= y + height;
      const onRight =
        Math.abs(pointX - (x + width)) <= tolerance &&
        pointY >= y &&
        pointY <= y + height;
      const onTop =
        Math.abs(pointY - y) <= tolerance && pointX >= x && pointX <= x + width;
      const onBottom =
        Math.abs(pointY - (y + height)) <= tolerance &&
        pointX >= x &&
        pointX <= x + width;

      return onLeft || onRight || onTop || onBottom;
    }

    case 'circle': {
      const { x, y, radius } = element;
      const centerX = x + radius;
      const centerY = y + radius;
      const dx = pointX - centerX;
      const dy = pointY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return Math.abs(distance - radius) <= tolerance;
    }

    case 'ellipse': {
      const { x, y, radiusX, radiusY } = element;
      const centerX = x + radiusX;
      const centerY = y + radiusY;
      const dx = pointX - centerX;
      const dy = pointY - centerY;
      const value =
        (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY);

      return Math.abs(value - 1) <= tolerance / Math.max(radiusX, radiusY);
    }

    case 'image': {
      const { shape, ...rest } = element;
      const pointCoordinate = {
        x: pointX,
        y: pointY,
      };

      if (shape) {
        return isPointOnShapeBorder(pointCoordinate, shape);
      }

      return isPointOnShapeBorder(pointCoordinate, {
        ...rest,
        type: 'rectangle',
      });
    }

    default:
      throw new Error('Unsupported element type');
  }
};
