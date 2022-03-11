import {
  IsString,
  MaxLength,
  IsOptional,
  IsDate,
} from "class-validator";
import {Author, Media, Relevance} from "../entity";
import {Type} from "class-transformer";

export class ActivityScopeDto {

  id: number;

  author_id: Author | number;

  media: Media | number;

  relevance: Relevance | number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(4, { message: "최대 4자까지 입력됩니다." })
  start_year: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(4, { message: "최대 4자까지 입력됩니다." })
  end_year: string;


  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;

}

