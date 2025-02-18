import { ApiProperty } from '@nestjs/swagger';

export class OwnedNftDto {
  collection: string;
  tokenId: string;
  name?: string;
  description?: string;
  tokenUri?: string;
}
