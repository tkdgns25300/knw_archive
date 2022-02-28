import {
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsDate,
} from "class-validator";

export class AdminDto {
  @IsOptional()
  @MaxLength(40, { message: "최대 40자까지 입력됩니다." })
  @IsString({ message: "문자열이 아닙니다." })
  admin_id: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(129, { message: "최대 100자까지 입력됩니다." })
  password: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(40, { message: "최대 40자까지 입력됩니다." })
  name: string;

  @IsDate()
  @IsOptional()
  last_login: Date;

  @IsOptional()
  @IsBoolean({ message: "boolean타입이 아닙니다." })
  is_super: boolean;


  created_at?: Date | null;
}

