import { useEffect, useRef, useState } from 'react';

import { drawElement, ElementOptions } from '@/utils/index';

const A4_RATIO = 1.38;
const CANVAS_WIDTH = window.innerWidth * 0.66;
const CANVAS_HEIGHT = CANVAS_WIDTH * A4_RATIO;

const initialGridData: ElementOptions[] = [
  {
    type: 'circle',
    radius: 100,
    x: 125,
    y: 125,
    isFilled: true,
    color: '#4A593D',
  },
  {
    type: 'rectangle',
    width: 500,
    height: 180,
    x: 400,
    y: 80,
    isFilled: true,
    color: '#64363C',
  },
  {
    type: 'rectangle',
    width: 250,
    height: 270,
    x: 600,
    y: 20,
    isFilled: true,
    color: '#6E552F',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 387,
    height: 518,
    x: 700 - 100,
    y: 600 - 300,
    opacity: 0.3,
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 200,
    height: 200,
    x: 200 - 100,
    y: 600 - 100,
    shape: {
      type: 'circle',
      radius: 100,
      x: 100,
      y: 500,
    },
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 200,
    height: 259,
    x: 450 - 100,
    y: 600 - 100,
    shape: {
      type: 'circle',
      radius: 100,
      x: 350,
      y: 500,
    },
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 387,
    height: 518,
    x: 700 - 100,
    y: 600 - 300,
    shape: {
      type: 'circle',
      radius: 100,
      x: 700,
      y: 600,
    },
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1749497683202-d3073573d996?q=80&w=1247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 300,
    height: 300,
    x: 200 - 150,
    y: 950 - 150,
    shape: {
      type: 'ellipse',
      radiusX: 150,
      radiusY: 100,
      x: 50,
      y: 800,
    },
  },
  {
    type: 'text',
    x: 300,
    y: 360,
    width: 36,
    height: 20,
    text: 'Hello',
    color: 'amber',
  },
  {
    type: 'rectangle',
    x: 300,
    y: 360,
    width: 36,
    height: 12,
  },
  {
    type: 'ellipse',
    radiusX: 75,
    radiusY: 50,
    x: 400,
    y: 800,
    color: '#BCB8B1',
    isFilled: true,
  },
];

const Workbench = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const assistantCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCoordinate = useRef({ x: 0, y: 0 });

  const [gridData] = useState(initialGridData);
  const [assistantGridData] = useState<ElementOptions[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      canvasCoordinate.current = {
        x: canvasRef.current?.offsetLeft || 0,
        y: canvasRef.current?.offsetTop || 0,
      };
    }
  }, []);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx) {
      gridData.forEach((data) => {
        drawElement(ctx, data);
      });
    }
  }, [gridData]);

  useEffect(() => {
    const ctx = assistantCanvasRef.current?.getContext('2d');

    if (ctx) {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      assistantGridData.forEach((data) => {
        drawElement(ctx, data);
      });
    }
  }, [assistantGridData]);

  return (
    <div className="bg-neutral-900 flex flex-col items-center gap-4 p-8">
      {/* TODO: install a UI lib which supports Tailwind 4 */}
      <div className="flex rounded overflow-hidden bg-zinc-500 [&_button]:not-last:border-r">
        {(['rectangle', 'circle', 'text'] as const).map((elementType) => (
          <button
            key={elementType}
            type="button"
            className="cursor-pointer text-sky-50 p-2"
            onClick={() => {
              // TODO:
            }}
          >
            {elementType}
          </button>
        ))}
      </div>

      <div className="relative bg-zinc-200">
        <canvas
          id="canvas"
          ref={canvasRef}
          className="border border-solid border-sky-300"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        ></canvas>
        <canvas
          ref={assistantCanvasRef}
          className="border border-solid border-indigo-300 absolute top-0"
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
        ></canvas>
      </div>
    </div>
  );
};

export default Workbench;
