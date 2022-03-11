import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Media } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(Media)
export class MediaQueryRepo extends BaseQueryRepo {
  constructor() {
    super('media', 'Media');
  }

}
