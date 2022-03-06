import { Button, Label } from "./dom";
import { filter, fromEvent, Subject } from "rxjs";

// 計數器的值
let count = 0;
// 自訂 subject 來通知計數器值改變
let counter$: Subject<number>;

// 「開始新的計數器」按鈕事件訂閱
fromEvent(Button.startButton, "click").subscribe(() => {
  counter$ = new Subject();
  count = 0;
  Label.statusLabel.innerHTML = `目前狀態：開始計數`;
  counter$.subscribe({
    next: (data) => {
      Label.currentCounterLabel.innerHTML = `目前計數：${data}`;
    },
  });

  const evenCounter$ = counter$.pipe(filter((data) => data % 2 === 0));
  evenCounter$.subscribe((data) => (Label.evenCounterLabel.innerHTML = `偶數計數：${data}`));

  // 處理「顯示狀態」邏輯
  counter$.subscribe({
    error: (message) => {
      Label.statusLabel.innerHTML = `目前狀態：錯誤 -> ${message}`;
    },
    complete: () => {
      Label.statusLabel.innerHTML = "目前狀態：完成";
    },
  });

  // 一開始就送出預設值
  counter$.next(count);
});

// 「計數」按鈕事件訂閱
fromEvent(Button.countButton, "click").subscribe(() => counter$.next(++count));

// 「發生錯誤」按鈕事件訂閱
fromEvent(Button.errorButton, "click").subscribe(() => {
  counter$.error(prompt("請輸入錯誤訊息") || "error");
});

// 「完成計數」按鈕訂閱
fromEvent(Button.completeButton, "click").subscribe(() => counter$.complete());
