import { Button, Label } from "./dom";

// 計數器的值
let count = 0;

Button.startButton.addEventListener("click", () => {
  count = 0;
  Label.statusLabel.innerHTML = `目前狀態：開始計數`;
  Label.currentCounterLabel.innerHTML = `目前計數：${count}`;
  Label.evenCounterLabel.innerHTML = `偶數計數：${count}`;
});

Button.countButton.addEventListener("click", () => {
  ++count;
  Label.currentCounterLabel.innerHTML = `目前計數：${count}`;
  if (count % 2 == 0) {
    Label.evenCounterLabel.innerHTML = `偶數計數：${count}`;
  }
});

Button.completeButton.addEventListener("click", () => {
  Label.statusLabel.innerHTML = "目前狀態：完成";
});

Button.errorButton.addEventListener("click", () => {
  const message = prompt("請輸入錯誤訊息") || "error";
  Label.statusLabel.innerHTML = `目前狀態：錯誤 -> ${message}`;
});
