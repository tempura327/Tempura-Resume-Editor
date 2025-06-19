import { useEffect, useRef, useState } from 'react';

import { drawShape, ShapeOptions } from '@/utils/index';

const A4_RATIO = 1.38;
const CANVAS_WIDTH = window.innerWidth * 0.66;
const CANVAS_HEIGHT = CANVAS_WIDTH * A4_RATIO;

const initialGridData: ShapeOptions[] = [];

const Workbench = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gridData] = useState(initialGridData);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');

    if (ctx) {
      gridData.forEach((data) => {
        drawShape(ctx, data);
      });
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
