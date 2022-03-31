import {
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class MediaDto {

  id: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(10, { message: "최대 10자까지 입력됩니다." })
  name: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(20, { message: "최대 20자까지 입력됩니다." })
  hex_color: string;

  @IsOptional()
  @IsBoolean({ message: "boolean타입이 아닙니다." })
  is_visible: boolean;

  created_at?: Date | null;
}

