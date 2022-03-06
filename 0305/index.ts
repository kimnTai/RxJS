import { filter, fromEvent, map } from "rxjs";

fromEvent(document, "click")
  .pipe(
    filter((_, index) => index % 2 === 0),
    map((event: MouseEvent) => ({ x: event.x, y: event.y }))
  )
  .subscribe((position) => {
    console.log(`x: ${position.x}, y: ${position.y}`);
  });
const color = "#e06c75 , #61afef , #c162de , #e5c07b , #282c34";
