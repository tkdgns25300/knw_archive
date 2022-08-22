import {
  IsString,
  MaxLength,
  IsOptional, IsDate, IsBoolean,
} from "class-validator";
import {Type} from "class-transformer";

export class WorkItemDto {

  id: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(100, { message: "최대 100자까지 입력됩니다." })
  title: string;

  @IsOptional()
  // @IsDate()
  // @Type(() => Date)
  published_from: string;

  @IsOptional()
  // @IsDate()
  // @Type(() => Date)
  published_to: Date;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(10, { message: "최대 10자까지 입력됩니다." })
  publish_media: string;

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
  img_src: string|null;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(50, { message: "최대 50자까지 입력됩니다." })
  img_name: string|null;

  @IsOptional()
  @IsString()
  img_base64: string|null;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(10, { message: "최대 10자까지 입력됩니다." })
  genre: string;

  @IsOptional()
  @IsBoolean({ message: "boolean타입이 아닙니다." })
  is_visible: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;
}

