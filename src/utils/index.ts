type Coordinate = {
  x: number;
  y: number;
};

type Shape =
  | {
      type: 'rectangle';
      left: number;
      top: number;
      width: number;
      height: number;
    }
  | {
      type: 'circle';
      centerX: number;
      centerY: number;
      radius: number;
    }
  | {
      type: 'ellipse';
      centerX: number;
      centerY: number;
      radiusX: number;
      radiusY: number;
    };

export const isPointInsideShape = ({ x, y }: Coordinate, shape: Shape) => {
  switch (shape.type) {
    case 'rectangle': {
      const { left, top, width, height } = shape;
      return x >= left && x <= left + width && y >= top && y <= top + height;
    }
    case 'circle': {
      const { centerX, centerY, radius } = shape;
      const dx = x - centerX;
      const dy = y - centerY;
      return dx * dx + dy * dy <= radius * radius;
    }
    case 'ellipse': {
      const { centerX, centerY, radiusX, radiusY } = shape;
      const dx = x - centerX;
      const dy = y - centerY;
      return (
        (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1
      );
    }
    default:
      throw new Error('Unsupported shape type');
  }
};

export const isPointOnShapeBorder = (
  { x, y }: Coordinate,
  shape: Shape,
  tolerance = 2,
) => {
  switch (shape.type) {
    case 'rectangle': {
      const { left, top, width, height } = shape;

      const onLeft =
        Math.abs(x - left) <= tolerance && y >= top && y <= top + height;
      const onRight =
        Math.abs(x - (left + width)) <= tolerance &&
        y >= top &&
        y <= top + height;
      const onTop =
        Math.abs(y - top) <= tolerance && x >= left && x <= left + width;
      const onBottom =
        Math.abs(y - (top + height)) <= tolerance &&
        x >= left &&
        x <= left + width;

      return onLeft || onRight || onTop || onBottom;
    }

    case 'circle': {
      const { centerX, centerY, radius } = shape;
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return Math.abs(distance - radius) <= tolerance;
    }

    case 'ellipse': {
      const { centerX, centerY, radiusX, radiusY } = shape;
      const dx = x - centerX;
      const dy = y - centerY;
      const value =
        (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY);

      return Math.abs(value - 1) <= tolerance / Math.max(radiusX, radiusY);
    }

    default:
      throw new Error('Unsupported shape type');
  }
};
