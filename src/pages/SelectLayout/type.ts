export enum ColorType {
  Primary = 'primary',
  Accent = 'accent',
  Text = 'text',
  TextContrast = 'textContrast',
}

export type ColorOption = {
  type: ColorType;
  hex: string;
  labelClass: string;
};

export type ThemeOption = ColorOption[];
