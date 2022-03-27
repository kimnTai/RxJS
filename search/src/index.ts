// 畫面上的 DOM 物件操作程式
import domUtils from "./dom-utils";
// 存取 API 資料的程式碼
import dataUtils from "./data-utils";
import {
  debounceTime,
  fromEvent,
  map,
  switchMap,
  distinctUntilChanged,
  filter,
  take,
  shareReplay,
  startWith,
} from "rxjs";

const keyword$ = fromEvent(document.querySelector("#keyword"), "input").pipe(
  map((event) => (event.target as HTMLInputElement).value),
  // 讓資料流有初始值
  startWith(""),
  // 共享最後一次事件資料
  shareReplay(1)
);

keyword$
  .pipe(
    // 避免一有新事件就查詢
    debounceTime(700),
    // 避免重複的查詢 - 只有當新的事件值與上一次的事件值不同時，才會繼續讓事件發生
    distinctUntilChanged(),
    // 避免內容太少查出不精準的結果
    filter((keyword) => keyword.length >= 3),
    // switchMap  將某個事件值換成另一個 Observable
    switchMap((keyword) => dataUtils.getSuggestions(keyword))
  )
  .subscribe((suggestions) => domUtils.fillAutoSuggestions(suggestions));

// 按鈕事件包裝成 Observable
const search$ = fromEvent(document.querySelector("#search"), "click");

// 使用搭配 take(1) 確保只會取得一次
const keywordForSearch$ = keyword$.pipe(take(1));

const searchByKeyword$ = search$.pipe(
  switchMap(() => keywordForSearch$),
  // 排除空字串查詢
  filter((keyword) => !!keyword)
);

searchByKeyword$
  .pipe(switchMap((keyword) => dataUtils.getSearchResult(keyword)))
  .subscribe((result: any) => {
    domUtils.fillSearchResult(result);
  });
