export type searchResultItem = { name: string; stars: number; forks: number };

class DomUtils {
  suggestionElement: Element;
  repositoriesTableBodyElement: Element;
  loadingBlockElement: HTMLElement;
  bodyElement: HTMLElement;

  constructor() {
    this.suggestionElement = document.querySelector("#suggestions");
    this.repositoriesTableBodyElement = document.querySelector("#repositories tbody");
    this.loadingBlockElement = document.querySelector("#loading-block");
    this.bodyElement = document.querySelector("body");
  }

  /**
   * @description 顯示自動完成的建議內容
   * @param {string[]} suggestions
   * @memberof DomUtils
   */
  fillAutoSuggestions(suggestions: string[]): void {
    this.suggestionElement.innerHTML = "";
    suggestions.forEach((suggestion) => {
      const optionElement = document.createElement("option");
      optionElement.append(document.createTextNode(suggestion));
      this.suggestionElement.append(optionElement);
    });
  }

  /**
   * @description 顯示搜尋結果
   * @param {searchResultItem[]} searchResult
   * @memberof DomUtils
   */
  fillSearchResult(searchResult: searchResultItem[]): void {
    this.repositoriesTableBodyElement.innerHTML = "";
    searchResult.forEach((repository) => {
      const rowElement = document.createElement("tr");
      const cellNameElement = document.createElement("td");
      const cellStarsElement = document.createElement("td");
      const cellForksElement = document.createElement("td");

      cellNameElement.append(document.createTextNode(repository.name));
      cellStarsElement.append(document.createTextNode(repository.stars.toString()));
      cellForksElement.append(document.createTextNode(repository.forks.toString()));
      rowElement.append(cellNameElement);
      rowElement.append(cellStarsElement);
      rowElement.append(cellForksElement);

      this.repositoriesTableBodyElement.append(rowElement);
    });
  }

  /**
   * @description 當開始搜尋資料時，呼叫此方法將畫面遮罩，避免多餘的操作
   * @memberof DomUtils
   */
  loading(): void {
    this.loadingBlockElement.style.width = this.bodyElement.getBoundingClientRect().width + "px";
    this.loadingBlockElement.style.height = this.bodyElement.getBoundingClientRect().height + "px";
    this.loadingBlockElement.style.display = "block";
  }

  /**
   * @description 當完成搜尋後，呼叫次方法隱藏畫面遮罩，以便進行其他操作
   * @memberof DomUtils
   */
  loaded(): void {
    this.loadingBlockElement.style.display = "none";
  }

  /**
   * @description 更新頁碼的畫面資訊
   * @param {number} pageNumber
   * @memberof DomUtils
   */
  updatePageNumber(pageNumber: number): void {
    document.querySelector("#page-number").innerHTML = pageNumber.toString();
  }

  updateSortOrder(target: Element, order: string): void {
    const iconElement = document.createElement("i");
    iconElement.classList.add("fa");
    iconElement.classList.add(order === "asc" ? "fa-sort-up" : "fa-sort-down");
    target.append(iconElement);
  }

  /**
   * @description 更新依照 stars 排序的畫面資訊
   * @param {{ sort: string; order: string }} sort
   * @memberof DomUtils
   */
  updateStarsSort(sort: { sort: string; order: string }): void {
    this.clearSortOrder();
    this.updateSortOrder(this.starsOrderElement, sort.order);
  }

  /**
   * @description 更新依照 forks 排序的畫面資訊
   * @param {{ sort: string; order: string }} sort
   * @memberof DomUtils
   */
  updateForksSort(sort: { sort: string; order: string }): void {
    this.clearSortOrder();
    this.updateSortOrder(this.forksOrderElement, sort.order);
  }

  get starsOrderElement(): Element {
    return document.querySelector("#sort-stars-icon");
  }
  get forksOrderElement(): Element {
    return document.querySelector("#sort-forks-icon");
  }

  private clearSortOrder(): void {
    this.starsOrderElement.innerHTML = "";
    this.forksOrderElement.innerHTML = "";
  }
}

export default new DomUtils();
