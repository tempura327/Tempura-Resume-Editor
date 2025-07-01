export type Coordinate = {
  x: number;
  y: number;
};

export type Rectangle = {
  type: 'rectangle';
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Circle = {
  type: 'circle';
  centerX: number;
  centerY: number;
  radius: number;
};

export type Ellipse = {
  type: 'ellipse';
  centerX: number;
  centerY: number;
  radiusX: number;
  radiusY: number;
};

export type Shape = Rectangle | Circle | Ellipse;

export type Text = {
  type: 'text';
  x: number;
  y: number;
  text: string;
  fontSize?: number;
  fontFamily?: string;
};

type ElementCommonOptions = {
  color?: string;
  opacity?: number;
  isFilled?: boolean;
};

export type RectOptions = Rectangle & ElementCommonOptions;

export type CircleOptions = Circle & ElementCommonOptions;

export type EllipseOptions = Ellipse &
  ElementCommonOptions & {
    rotation?: number;
  };

export type ShapeOptions = RectOptions | CircleOptions | EllipseOptions;

export type TextOptions = Text & ElementCommonOptions;

export type ElementOptions = ShapeOptions | TextOptions;
