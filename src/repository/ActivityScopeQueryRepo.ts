import {createQueryBuilder, EntityRepository} from "typeorm";
import {Service} from "typedi";

import {ActivityScope} from "../entity";
import {BaseQueryRepo} from "./BaseQueryRepo";
import {ActivitySearchReq} from "../api";

@Service()
@EntityRepository(ActivityScope)
export class ActivityScopeQueryRepo extends BaseQueryRepo {
  constructor() {
    super('activity_scope', 'ActivityScope');
  }


  search(param: ActivitySearchReq) {
    const result =  createQueryBuilder("activity_scope")
        .leftJoinAndSelect("ActivityScope.author_id", "author")
        .leftJoinAndSelect("ActivityScope.media", "media")
        .leftJoinAndSelect("ActivityScope.relevance", "relevance")
        .where("ActivityScope.author_id IN (:author_id)", {author_id: param.getAuthor})
        .andWhere("ActivityScope.media IN (:media)", {media: param.getMedia})
        .andWhere("ActivityScope.relevance IN (:relevance)", {relevance: param.getRelevance})
        .andWhere("ActivityScope.is_visible IN (:is_visible)", {is_visible: true})
        .select([
            "ActivityScope.id",
            "ActivityScope.period",
            "ActivityScope.is_visible",
            "ActivityScope.updated_at",
            "ActivityScope.created_at",
            "media.id",
            "media.name",
            "media.hex_color",
            "relevance.id",
            "relevance.name",
            "author.name",
        ])

        // limit, offset 불필요
        // return result.skip(param.getOffset())
        //   .take(param.getLimit())
        //   .getManyAndCount();
        return result.getManyAndCount();
  }

  async findAll(param: ActivitySearchReq) {
      return await createQueryBuilder("activity_scope")
          .leftJoinAndSelect("ActivityScope.author_id", "author")
          .leftJoinAndSelect("ActivityScope.media", "media")
          .leftJoinAndSelect("ActivityScope.relevance", "relevance")
          .select([
              "ActivityScope.id",
              "ActivityScope.period",
              "ActivityScope.is_visible",
              "ActivityScope.updated_at",
              "ActivityScope.created_at",
              "media.name",
              "relevance.name",
              "author.name",
          ])
          .orderBy(param.getOrderBy, param.getOrder)
          .skip(param.getOffset())
          .take(param.getLimit())
          .getManyAndCount();
  }

}
