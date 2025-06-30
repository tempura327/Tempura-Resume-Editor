import { useEffect, useRef, useState } from 'react';

import { drawElement, ElementOptions } from '@/utils/index';

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
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 280,
    height: 280,
    patternWidth: 200, // radius * 2
    patternHeight: 200,
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
    src: 'https://images.unsplash.com/photo-1749497683202-d3073573d996?q=80&w=1247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 280,
    height: 280,
    patternWidth: 600, // radius * 2
    patternHeight: 300,
    x: 200 - 150,
    y: 840 - 150,
    shape: {
      type: 'ellipse',
      radiusX: 150,
      radiusY: 100,
      centerX: 200,
      centerY: 840,
    },
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 280,
    height: 280,
    patternWidth: 300,
    patternHeight: 300,
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
    src: 'https://images.unsplash.com/photo-1749497683202-d3073573d996?q=80&w=1247&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 280,
    height: 280,
    patternWidth: 400, // radius * 2
    patternHeight: 200,
    x: 550 - 150,
    y: 840 - 100,
    shape: {
      type: 'ellipse',
      radiusX: 150,
      radiusY: 100,
      centerX: 550,
      centerY: 840,
    },
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    width: 280,
    height: 280,
    patternWidth: 300,
    patternHeight: 300,
    x: 700 - 100,
    y: 600 - 200,
    shape: {
      type: 'circle',
      radius: 100,
      centerX: 700,
      centerY: 600,
    },
  },
];

const Workbench = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gridData] = useState(initialGridData);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx) {
      // ctx.save(); // 儲存原始狀態
      // ctx.beginPath();
      // const img = new Image(50, 50);
      // img.src =
      //   'https://images.unsplash.com/photo-1649980089975-c3e5c2d73ad8?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      // img.onload = () => {
      gridData.forEach((data) => {
        drawElement(ctx, data);
      });
      //   ctx.clip(); // 啟用剪裁
      //   const radius = 100;
      //   const shapeCoordinate = {
      //     x: 200,
      //     y: 250,
      //   };
      //   const destSize = radius * 2;
      //   const dx = shapeCoordinate.x - radius;
      //   const dy = shapeCoordinate.y - radius;
      //   ctx.drawImage(img, dx, dy, destSize, destSize);
      //   ctx.restore();
      // };
    }
  }, [gridData]);

  return (
    <div className="p-8 flex items-center justify-center">
      <canvas
        id="canvas"
        ref={canvasRef}
        className="border border-solid border-sky-300"
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
      ></canvas>
    </div>
  );
};

export default Workbench;
