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
  x: number;
  y: number;
  radius: number;
};

export type Ellipse = {
  type: 'ellipse';
  x: number;
  y: number;
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

export type Image = {
  type: 'image';
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  shape?: Shape;
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

export type ImageOptions = Image & Pick<ElementCommonOptions, 'opacity'>;

export type ElementOptions = ShapeOptions | TextOptions | ImageOptions;
