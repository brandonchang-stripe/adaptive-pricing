import { Vector2 } from "@/types/Vector2";
import { useEffect, useRef } from "react";

export type DragData = {
  isDragging: boolean;
  current: Vector2;
  startMouse: Vector2;
  lastMouse: Vector2;
  offset: Vector2;
  lastOffset: Vector2;
  velocity: Vector2;
};

type DragOptions = {
  startPosition?: Vector2;
  minX?: number;
  minY?: number;
  maxX?: number;
  maxY?: number;
  damp?: number;
  draggable?: boolean;
};

export function useDrag<T extends HTMLElement>(options: DragOptions = {}) {
  const { minX, minY, maxX, maxY, damp, draggable, startPosition } = options;
  const ref = useRef<T>(null);
  const rafRef = useRef<number | null>(null);
  const dragData = useRef<DragData>({
    isDragging: false,
    current: { x: 0, y: 0 },
    startMouse: { x: 0, y: 0 },
    lastMouse: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    lastOffset: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("mousedown", onMouseDown);
    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseup", onMouseUp);

    return () => {
      el.removeEventListener("mousedown", onMouseDown);
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseup", onMouseUp);
    };
  }, [ref]);

  useEffect(() => {
    function tick() {
      const { isDragging, velocity, lastOffset, offset } = dragData.current;

      if (damp) {
        if (isDragging) {
          dragData.current.velocity.x = offset.x - lastOffset.x;
          dragData.current.velocity.y = offset.y - lastOffset.y;
        } else {
          dragData.current.velocity.x = velocity.x * damp;
          dragData.current.velocity.y = velocity.y * damp;

          if (Math.abs(dragData.current.velocity.x) < 0.01) {
            dragData.current.velocity.x = 0;
          }
          if (Math.abs(dragData.current.velocity.y) < 0.01) {
            dragData.current.velocity.y = 0;
          }

          dragData.current.lastOffset.x = dragData.current.offset.x;
          dragData.current.lastOffset.y = dragData.current.offset.y;

          dragData.current.offset.x += dragData.current.velocity.x;
          dragData.current.offset.y += dragData.current.velocity.y;

          if (minX !== undefined) {
            dragData.current.offset.x = Math.max(
              dragData.current.offset.x,
              minX
            );
          }
          if (maxX !== undefined) {
            dragData.current.offset.x = Math.min(
              dragData.current.offset.x,
              maxX
            );
          }
        }
      }

      if (draggable && ref.current) {
        ref.current.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    if (startPosition) {
      dragData.current.offset.x = startPosition.x;
      dragData.current.offset.y = startPosition.y;
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function onMouseDown(e: MouseEvent) {
    dragData.current.isDragging = true;

    dragData.current.startMouse.x = e.clientX;
    dragData.current.startMouse.y = e.clientY;

    dragData.current.current.x = e.clientX;
    dragData.current.current.y = e.clientY;

    dragData.current.lastMouse.x = e.clientX;
    dragData.current.lastMouse.y = e.clientY;
  }

  function onMouseMove(e: MouseEvent) {
    if (!dragData.current.isDragging) return;
    dragData.current.lastMouse.x = dragData.current.current.x;
    dragData.current.lastMouse.y = dragData.current.current.y;

    dragData.current.current.x = e.clientX;
    dragData.current.current.y = e.clientY;

    dragData.current.lastOffset.x = dragData.current.offset.x;
    dragData.current.lastOffset.y = dragData.current.offset.y;

    dragData.current.offset.x -=
      dragData.current.lastMouse.x - dragData.current.current.x;
    dragData.current.offset.y -=
      dragData.current.lastMouse.y - dragData.current.current.y;

    if (minX !== undefined) {
      dragData.current.offset.x = Math.max(dragData.current.offset.x, minX);
    }
    if (maxX !== undefined) {
      dragData.current.offset.x = Math.min(dragData.current.offset.x, maxX);
    }
  }

  function onMouseUp() {
    dragData.current.isDragging = false;
  }

  return [ref, dragData.current] as const;
}
