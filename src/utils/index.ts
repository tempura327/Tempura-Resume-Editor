import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export * from './check';
export * from './draw';
export * from './type';

export const tlsx = (...params: (string | Record<string, boolean>)[]) => {
  return twMerge(clsx(params));
};
