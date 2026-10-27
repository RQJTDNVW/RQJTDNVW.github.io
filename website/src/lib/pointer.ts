/**
 * A single global pointer broadcaster.
 *
 * Every parallax surface subscribes here instead of attaching its own
 * `pointermove` listener, so adding more responsive elements costs nothing.
 * Values are normalised to -1..1 with the viewport centre as the origin.
 */
type PointerSubscriber = (x: number, y: number) => void;

const subscribers = new Set<PointerSubscriber>();

let frame = 0;
let nextX = 0;
let nextY = 0;
let attached = false;

const flush = () => {
  frame = 0;
  for (const fn of subscribers) fn(nextX, nextY);
};

const handlePointerMove = (event: PointerEvent) => {
  nextX = (event.clientX / window.innerWidth) * 2 - 1;
  nextY = (event.clientY / window.innerHeight) * 2 - 1;
  if (!frame) frame = requestAnimationFrame(flush);
};

export const subscribePointer = (fn: PointerSubscriber): (() => void) => {
  subscribers.add(fn);

  if (!attached) {
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    attached = true;
  }

  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && attached) {
      window.removeEventListener("pointermove", handlePointerMove);
      attached = false;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    }
  };
};
