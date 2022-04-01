import {
  IsString,
  MaxLength,
  IsOptional, IsDate, IsInt, IsBoolean,
} from "class-validator";
import {Type} from "class-transformer";

export class ProofItemDto {

  id: number;

  @IsInt()
  chronology_id: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(100, { message: "최대 100자까지 입력됩니다." })
  file_src: string;

  @IsOptional()
  @IsString()
  file_base64: string|null;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(200, { message: "최대 200자까지 입력됩니다." })
  reference: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  content: string;

  @IsOptional()
  @IsBoolean()
  is_visible: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;
}

