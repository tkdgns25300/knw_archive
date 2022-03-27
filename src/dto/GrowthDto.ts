import {
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class GrowthDto {

  id: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(10, { message: "최대 10자까지 입력됩니다." })
  title: string;

  @IsOptional()
  @IsBoolean({ message: "boolean타입이 아닙니다." })
  is_visible: boolean;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(1000, { message: "최대 1000자까지 입력됩니다." })
  content: string;

  created_at?: Date | null;
}

