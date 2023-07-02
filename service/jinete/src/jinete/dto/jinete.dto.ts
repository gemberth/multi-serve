import { ApiProperty } from "@nestjs/swagger";

export class CreateJineteDTO {
    @ApiProperty() readonly nombre: string;
    @ApiProperty() readonly nacionalidad: string;
    @ApiProperty() readonly caballo: string;
    @ApiProperty() readonly logros: string;
    

}