import { Body, Controller, HttpException, HttpStatus, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ValidatorInterceptor } from "src/interceptors/validator.interceptor";
import { Result } from "../models/result.model";
import { Pet } from "../models/pet.model";
import { PetService } from "../services/pet.service";
import { CreatePetContract } from "../contracts/pet/create-pet.contract";

// localhost:3000/v1/pets
@Controller('v1/pets')
export class PetController {

    constructor(
        private readonly service: PetService) {
    }

    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            await this.service.create(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel criar seu pet.', HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Body() model: Pet, @Param('id') id) {
        try {
            await this.service.update(document, id, model);
            return new Result(null, true, model, null);
        } catch (error) {
            return this.tratarExcessao(error, 'Não foi possivel atualizar seu pet.', HttpStatus.BAD_REQUEST);
        }
    }

    public tratarExcessao(error, message: string, status: number) {
        return new HttpException(new Result(message, false, null, error), status);
    }
}