import { EntityRepository } from "typeorm";
import { Service } from "typedi";

import { Author } from "../entity";
import { BaseQueryRepo } from "./BaseQueryRepo";

@Service()
@EntityRepository(Author)
export class AuthorQueryRepo extends BaseQueryRepo {
  constructor() {
    super('author', 'Author');
  }

}
