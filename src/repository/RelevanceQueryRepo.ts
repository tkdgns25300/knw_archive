import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Relevance } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(Relevance)
export class RelevanceQueryRepo extends BaseQueryRepo {
  constructor() {
    super('relevance', 'Relevance');
  }

}
