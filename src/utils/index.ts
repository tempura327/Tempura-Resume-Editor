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

type Text = {
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  fontFamily?: string;
};

type Shape = Rectangle | Circle | Ellipse | Text;

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

const DEFAULT_COLOR = '#cccccc';
const FULL_ANGLE = Math.PI * 2;
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_FONT_FAMILY = 'Arial, sans-serif';

type ShapeCommonOptions = {
  color?: string;
  isFilled?: boolean;
};

type RectOptions = Rectangle & ShapeCommonOptions;

export const drawRect = (
  ctx: CanvasRenderingContext2D,
  { x, y, width, height, color = DEFAULT_COLOR, isFilled }: RectOptions,
) => {
  if (isFilled) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  ctx.strokeStyle = color;
  ctx.strokeRect(x, y, width, height);
};

type CircleOptions = Circle & ShapeCommonOptions;

export const drawCircle = (
  ctx: CanvasRenderingContext2D,
  { centerX, centerY, radius, color = DEFAULT_COLOR, isFilled }: CircleOptions,
) => {
  ctx.beginPath();
  // false代表順時針
  ctx.arc(centerX, centerY, radius, 0, FULL_ANGLE, false);

  if (isFilled) {
    ctx.fillStyle = color;
    ctx.fill();
  }

  ctx.strokeStyle = color;
  ctx.stroke();
};

type EllipseOptions = Ellipse &
  ShapeCommonOptions & {
    rotation?: number;
  };

export const drawEllipse = (
  ctx: CanvasRenderingContext2D,
  {
    centerX,
    centerY,
    radiusX,
    radiusY,
    color = DEFAULT_COLOR,
    isFilled,
    rotation = 0,
  }: EllipseOptions,
) => {
  ctx.beginPath();

  ctx.ellipse(centerX, centerY, radiusX, radiusY, rotation, 0, FULL_ANGLE);

  if (isFilled) {
    ctx.fillStyle = color;
    ctx.fill();
  }

  ctx.strokeStyle = color;
  ctx.stroke();
};

type TextOptions = Text & ShapeCommonOptions;

export const drawText = (
  ctx: CanvasRenderingContext2D,
  {
    x,
    y,
    text,
    fontSize = DEFAULT_FONT_SIZE,
    fontFamily = DEFAULT_FONT_FAMILY,
    color = DEFAULT_COLOR,
    isFilled = true,
  }: TextOptions,
) => {
  ctx.textBaseline = 'top';
  ctx.font = `${fontSize}px ${fontFamily}`;

  if (isFilled) {
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  } else {
    ctx.strokeStyle = color;
    ctx.strokeText(text, x, y);
  }
};

export type ShapeOptions =
  | RectOptions
  | CircleOptions
  | EllipseOptions
  | TextOptions;

export const drawShape = (
  ctx: CanvasRenderingContext2D,
  data: ShapeOptions,
) => {
  switch (data.type) {
    case 'rectangle':
      drawRect(ctx, data);
      break;
    case 'circle':
      drawCircle(ctx, data);
      break;
    case 'ellipse':
      drawEllipse(ctx, data);
      break;
    case 'text':
      drawText(ctx, data);
      break;
    default:
  }
};
