import {
  ShapeOptions,
  RectOptions,
  CircleOptions,
  EllipseOptions,
  TextOptions,
  ElementOptions,
} from './type';

const DEFAULT_COLOR = '#cccccc';
const FULL_ANGLE = Math.PI * 2;
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_FONT_FAMILY = 'Arial, sans-serif';

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

    default:
  }
};

export const drawElement = (
  ctx: CanvasRenderingContext2D,
  data: ElementOptions,
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
