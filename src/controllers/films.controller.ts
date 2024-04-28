import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { FilmsService } from '../services/films.service';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { CACHE_MANAGER, CacheStore } from '@nestjs/cache-manager';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Film } from 'src/entities/film.entity';
import { ApiPaginatedResponse, FilmDto, Response } from './customDecorator';

@Controller('films')
export class FilmsController {
  constructor(
    private readonly filmsService: FilmsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 201, description: 'Cria um filme', type: Film })
  @ApiBody({ type: CreateFilmDto })
  async create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiPaginatedResponse(FilmDto)
  async findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiOkResponse({ type: Film })
  async findOne(@Param('id') id: string) {
    const cacheData = await this.cacheManager.get(id);
    if (cacheData) {
      return cacheData;
    }

    const film = await this.filmsService.findOne(+id);

    if (!film) throw new NotFoundException('Filme não existe');
    await this.cacheManager.set(id, film);

    return film;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiOkResponse({ type: Film })
  @ApiBody({ type: CreateFilmDto })
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    const updatedFilm = await this.filmsService.update(+id, updateFilmDto);
    await this.cacheManager.set(id, updatedFilm);
    return updatedFilm;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: 'string', example: '1' })
  @ApiOkResponse({ type: Response })
  async remove(@Param('id') id: string) {
    const film = await this.filmsService.findOne(+id);
    this.filmsService.remove(+id);
    return { message: `Filme ${film.name} de ID ${id} excluído com sucesso` };
  }
}
