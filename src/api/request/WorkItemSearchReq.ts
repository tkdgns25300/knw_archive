import {PageReq} from "./PageReq";

enum columnList {
  title = "title",
  ref_content = "ref_content",
  all = "all"
}

export class WorkItemSearchReq extends PageReq {
  column: columnList;
  keyword: string;
  genre: string;


  get getColumn() {
    return this.column ? this.column : columnList.title;
  }

  get getKeyword() {
    return this.keyword ? this.keyword : '';
  }
  get getGenre() {
    return this.genre ? this.genre : '';
  }

}
