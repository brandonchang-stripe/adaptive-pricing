import { useEffect, useRef } from "react";

export type DragData = {
  isDragging: boolean;
  current: { x: number; y: number };
  start: { x: number; y: number };
  last: { x: number; y: number };
  offset: { x: number; y: number };
};

type DragOptions = {
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
};

export function useDrag<T extends HTMLElement>(options?: DragOptions) {
  const ref = useRef<T>(null);
  const dragData = useRef<DragData>({
    isDragging: false,
    current: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
    last: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [ref.current]);

  function onMouseDown(e: MouseEvent) {
    dragData.current.isDragging = true;

    dragData.current.start.x = e.clientX;
    dragData.current.start.y = e.clientY;

    dragData.current.current.x = e.clientX;
    dragData.current.current.y = e.clientY;

    dragData.current.last.x = e.clientX;
    dragData.current.last.y = e.clientY;
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragData.current.isDragging) return;
    dragData.current.last.x = dragData.current.current.x;
    dragData.current.last.y = dragData.current.current.y;

    dragData.current.current.x = e.clientX;
    dragData.current.current.y = e.clientY;

    dragData.current.offset.x -= dragData.current.last.x - dragData.current.current.x;
    dragData.current.offset.y -= dragData.current.last.y - dragData.current.current.y;
  }

  function onMouseUp() {
    dragData.current.isDragging = false;
  }

  function onMouseLeave() {
    dragData.current.isDragging = false;
  }

  return [ref, dragData.current] as const;
}
