// 畫面上的 DOM 物件操作程式
import domUtils from "./dom-utils";
// 存取 API 資料的程式碼
import dataUtils from "./data-utils";
import { debounceTime, fromEvent, map, switchMap, distinctUntilChanged, filter } from "rxjs";

const keyword$ = fromEvent(document.querySelector("#keyword"), "input").pipe(
  map((event) => (event.target as HTMLInputElement).value)
);

keyword$
  .pipe(
    // 避免一有新事件就查詢
    debounceTime(700),
    // 避免重複的查詢
    distinctUntilChanged(),
    // 避免內容太少查出不精準的結果
    filter((keyword) => keyword.length >= 3),
    switchMap((keyword) => dataUtils.getSuggestions(keyword))
  )
  .subscribe((suggestions) => domUtils.fillAutoSuggestions(suggestions));

const search$ = fromEvent(document.querySelector("#search"), "click");
const searchByKeyword$ = search$.pipe(
  switchMap(() => keyword$),
  switchMap((keyword) => dataUtils.getSearchResult(keyword))
);

searchByKeyword$
  .pipe(switchMap((keyword: any) => dataUtils.getSearchResult(keyword)))
  .subscribe((result: any) => domUtils.fillSearchResult(result));
