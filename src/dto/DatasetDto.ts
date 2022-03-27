import {
  IsString,
  MaxLength,
  IsOptional, IsDate, IsBoolean,
} from "class-validator";
import {Type} from "class-transformer";

export class DatasetDto {

  id: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  title: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  description: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(100, { message: "최대 100자까지 입력됩니다." })
  organization: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  service: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  file_src: string|null;

  @IsOptional()
  @IsString()
  file_base64: string|null;

  @IsOptional()
  @IsBoolean({ message: "boolean타입이 아닙니다." })
  is_visible: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;
}

