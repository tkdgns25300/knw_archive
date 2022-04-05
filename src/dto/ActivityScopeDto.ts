import {
  IsString,
  MaxLength,
  IsOptional,
  IsDate, IsBoolean,
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
  @MaxLength(15, { message: "최대 15자까지 입력됩니다." })
  period: string;

  @IsOptional()
  @IsBoolean({ message: "boolean타입이 아닙니다." })
  is_visible: boolean;


  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;

}

