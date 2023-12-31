import {
  IsString,
  MaxLength,
  IsOptional, IsDate, IsBoolean,
} from "class-validator";
import {Type} from "class-transformer";
import {ProofItem} from "../entity";

export class ChronologyItemDto {

  id: number;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(10, { message: "최대 10자까지 입력됩니다." })
  age: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  @MaxLength(10, { message: "최대 10자까지 입력됩니다." })
  period: string;

  @IsOptional()
  @IsString({ message: "문자열이 아닙니다." })
  content: string;

  proof_items: ProofItem[];

  @IsOptional()
  @IsBoolean()
  is_visible: boolean;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updated_at: Date;

  created_at?: Date | null;
}

