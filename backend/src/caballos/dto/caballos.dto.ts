import { ApiProperty } from "@nestjs/swagger";

export class CreateCaballosDTO {
    @ApiProperty() readonly nombre: string;
    @ApiProperty() readonly numero: number;
    @ApiProperty() readonly raza: string;
    @ApiProperty() readonly pais: string;
    

}