import { IsString, IsNotEmpty, IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  first_name: string;

  @IsOptional()
  @IsNotEmpty()
  last_name: string;

  @IsOptional()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsNotEmpty()
  post_code: number;

  @IsOptional()
  @IsNotEmpty()
  contact_number: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/i,
    { message: 'email format is invalid ' },
  )
  email: string;

  @IsOptional()
  @IsNotEmpty()
  username: string;
}
