import { useEffect, useRef, useState } from 'react';

import { drawElement, ElementOptions, isPointInsideShape } from '@/utils/index';

const A4_RATIO = 1.38;
const CANVAS_WIDTH = window.innerWidth * 0.66;
const CANVAS_HEIGHT = CANVAS_WIDTH * A4_RATIO;

const initialGridData: ElementOptions[] = [
  {
    type: 'circle',
    radius: 100,
    centerX: 200,
    centerY: 250,
    isFilled: true,
    color: '#4A593D',
  },
  {
    type: 'rectangle',
    width: 500,
    height: 180,
    x: 700,
    y: 80,
    isFilled: true,
    color: '#64363C',
    // strokeColor: '#48cae4',
  },
  {
    type: 'rectangle',
    width: 250,
    height: 300,
    x: 1100,
    y: 100,
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
      centerX: 200,
      centerY: 600,
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
      centerX: 450,
      centerY: 600,
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
      centerX: 800,
      centerY: 600,
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
      centerX: 200,
      centerY: 950,
    },
  },
];

function omit(obj, keysToOmit) {
  const result = {};
  for (const key in obj) {
    if (!keysToOmit.includes(key)) {
      result[key] = obj[key];
    }
  }
  return result;
}

const Workbench = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const assistantCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasCoordinate = useRef({ x: 0, y: 0 });

  const [gridData, setGridData] = useState(initialGridData);
  const [assistantGridData, setAssistantGridData] = useState<ElementOptions[]>(
    [],
  );

  const handleTargetShape = (e: MouseEvent) => {
    const x = e.clientX - canvasCoordinate.current.x;
    const y = e.clientY - canvasCoordinate.current.y;

    const data = gridData.filter((shape) => {
      return isPointInsideShape({ x, y }, shape);
    });

    const target = data[data.length - 1];

    setAssistantGridData([
      // {
      //   type: 'circle',
      //   radius: 100,
      //   centerX: 200,
      //   centerY: 250,
      //   strokeColor: '#48cae4',
      // },
      {
        ...omit(target, ['color', 'isFilled']),
        strokeColor: '#48cae4',
      },
    ]);
  };

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
        console.log(123, data);
        drawElement(ctx, data);
      });
    }
  }, [assistantGridData]);

  return (
    <div className="p-8 flex items-center justify-center">
      <canvas
        id="canvas"
        ref={canvasRef}
        className="border border-solid border-sky-300"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
      <canvas
        ref={assistantCanvasRef}
        className="border border-solid border-sky-300 absolute"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleTargetShape}
      ></canvas>
    </div>
  );
};

export default Workbench;
