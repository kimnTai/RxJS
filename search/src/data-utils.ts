import { Observable } from "rxjs";
import { ajax } from "rxjs/ajax";
import { map } from "rxjs/operators";

// Search Repositories API Document
// https://docs.github.com/en/free-pro-team@latest/rest/reference/search#search-repositories

class DataUtils {
  baseUrl: string;
  constructor() {
    this.baseUrl = `https://api.github.com/search/repositories`;
  }

  getSuggestions(keyword: string): Observable<any> {
    const searchUrl = `${this.baseUrl}?q=${keyword}&per_page=10&page=1`;
    return ajax(searchUrl).pipe(
      map((response: any) => response.response.items),
      map(this.toSuggestionList)
    );
  }

  private toSuggestionList(repositories: any): any {
    return repositories.map((repository: any) => repository.full_name);
  }

  /**
   * @description 取得搜尋結果
   * @param {string} keyword
   * @param {string} [sort="stars"]
   * @param {string} [order="desc"]
   * @param {number} [page=1]
   * @param {number} [perPage=10]
   * @return {*}
   * @memberof DataUtils
   */
  getSearchResult(
    keyword: string,
    sort: string = "stars",
    order: string = "desc",
    page: number = 1,
    perPage: number = 10
  ): any {
    const searchUrl = `${this.baseUrl}?q=${keyword}&sort=${sort}&order=${order}&page=${page}&per_page=${perPage}`;

    return ajax(searchUrl).pipe(
      map((response: any) => response.response.items),
      map(this.toSearchResult)
    );
  }

  private toSearchResult(repositories: any): any {
    return repositories.map((repository: any) => ({
      name: repository.full_name,
      forks: repository.forks_count,
      stars: repository.stargazers_count,
    }));
  }
}

export default new DataUtils();
