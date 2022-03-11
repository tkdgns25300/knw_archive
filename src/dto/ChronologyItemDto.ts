import {
  IsString,
  MaxLength,
  IsOptional, IsDate,
} from "class-validator";
import {Type} from "class-transformer";
import {Author} from "../entity";

export class ChronologyItemDto {

  id: number;

  author_id: Author | number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(100, { message: "최대 100자까지 입력됩니다." })
  ref_text: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  ref_content: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  href: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  img_src: string;

  @IsOptional()
  @IsString()
  img_base64: string|null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;
}

