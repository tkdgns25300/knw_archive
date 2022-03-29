import {createQueryBuilder, EntityRepository} from "typeorm";
import { Service } from "typedi";

import { ActivityScope } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";
import {ActivitySearchReq, PageReq} from "../api";

@Service()
@EntityRepository(ActivityScope)
export class ActivityScopeQueryRepo extends BaseQueryRepo {
  constructor() {
    super('activity_scope', 'ActivityScope');
  }

  search(param: ActivitySearchReq) {
    const result =  createQueryBuilder("activity_scope")
        //.leftJoinAndSelect("ActivityScope.details", "offer_detail")
        .where("ActivityScope.author_id IN (:author_id)", {author_id: param.getAuthor})
        .andWhere("ActivityScope.media IN (:media)", {media: param.getMedia})
        .andWhere("ActivityScope.relevance IN (:relevance)", {relevance: param.getRelevance})

       return result.skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount();
  }

  findAll(param: PageReq) {
    return createQueryBuilder("activity_scope")

        .leftJoinAndSelect("ActivityScope.author_id", "author")
        // .select("author.name")
       // .leftJoinAndSelect("ActivityScope.media", "media")
       // .leftJoinAndSelect("ActivityScope.relevance", "relevance")
       // .orderBy('ActivityScope.created_at', param.getOrder)
        .skip(param.getOffset())
        .take(param.getLimit())
        .getManyAndCount();
  }

}
