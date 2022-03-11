import {
  IsString,
  MaxLength,
  IsOptional, IsDate, IsNumber,
} from "class-validator";
import {Type} from "class-transformer";

export class MainBannerDto {

  id: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  img_src: string;

  @IsOptional()
  @IsString()
  img_base64: string|null;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(20, { message: "최대 20자까지 입력됩니다." })
  title: string;

  @IsOptional()
  @IsNumber()
  order: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  description: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;
}

