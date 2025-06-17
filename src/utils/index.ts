type Coordinate = {
  x: number;
  y: number;
};

type Rectangle = {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
};

type Circle = {
  type: 'circle';
  centerX: number;
  centerY: number;
  radius: number;
};

type Ellipse = {
  type: 'ellipse';
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
};

type Shape = Rectangle | Circle | Ellipse;

export const isPointInsideShape = (
  { x: pointX, y: pointY }: Coordinate,
  shape: Shape,
) => {
  switch (shape.type) {
    case 'rectangle': {
      const { x, y, width, height } = shape;
      return (
        pointX >= x &&
        pointX <= x + width &&
        pointY >= y &&
        pointY <= y + height
      );
    }
    case 'circle': {
      const { centerX, centerY, radius } = shape;
      const dx = pointX - centerX;
      const dy = pointY - centerY;
      return dx * dx + dy * dy <= radius * radius;
    }
    case 'ellipse': {
      const { centerX, centerY, radiusX, radiusY } = shape;
      const dx = pointX - centerX;
      const dy = pointY - centerY;
      return (
        (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1
      );
    }
    default:
      throw new Error('Unsupported shape type');
  }
};

export const isPointOnShapeBorder = (
  { x: pointX, y: pointY }: Coordinate,
  shape: Shape,
  tolerance = 2,
) => {
  switch (shape.type) {
    case 'rectangle': {
      const { x, y, width, height } = shape;

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
      const { centerX, centerY, radius } = shape;
      const dx = pointX - centerX;
      const dy = pointY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      return Math.abs(distance - radius) <= tolerance;
    }

    case 'ellipse': {
      const { centerX, centerY, radiusX, radiusY } = shape;
      const dx = pointX - centerX;
      const dy = pointY - centerY;
      const value =
        (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY);

      return Math.abs(value - 1) <= tolerance / Math.max(radiusX, radiusY);
    }

    default:
      throw new Error('Unsupported shape type');
  }
};

// ------------------  draw  ----------------------------

type ShapeCommonOptions = {
  color?: string;
  isFilled?: boolean;
};

export type RectOptions = Omit<Rectangle, 'type'> & ShapeCommonOptions;

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, color = 'gold', isFilled = false }: RectOptions,
) => {
  if (isFilled) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeRect(x, y, width, height);
  }
};

type CircleOptions = Omit<Circle, 'type'> &
  ShapeCommonOptions & {
    angle?: number;
  };

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  {
    centerX,
    centerY,
    radius,
    angle = Math.PI * 2,
    color = 'gold',
    isFilled,
  }: CircleOptions,
) => {
  ctx.beginPath();
  // false代表順時針
  ctx.arc(centerX, centerY, radius, 0, angle, false);

  // 畫扇形
  if (angle < Math.PI * 2) {
    ctx.lineTo(centerX, centerY);
    ctx.lineTo(centerX + radius, centerY);
  }

  if (isFilled) {
    ctx.fillStyle = color;
    ctx.fill();
  }

  ctx.strokeStyle = color;
  ctx.stroke();
};
