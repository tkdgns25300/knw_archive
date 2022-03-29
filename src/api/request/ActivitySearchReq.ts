import {PageReq} from "./PageReq";

enum columnList {
  author_id = "author_id",
  media = "media",
  relevance = "relevance"
}

export class ActivitySearchReq extends PageReq {
  author_id: string;
  media: string;
  relevance: string;
  orderBy: string;

  get getAuthor() {
    console.log(this.author_id)
    return this.author_id ? this.author_id : "IS NOT NULL";
  }

  get getMedia() {
    return this.media ? [this.media] : "IS NOT NULL";
  }

  get getRelevance() {
    return this.relevance ? [this.relevance] : '';
  }

  get getOrderBy() {
    return this.orderBy ? this.orderBy : 'author.name';
  }

}
