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

@Controller('films')
export class FilmsController {
  constructor(
    private readonly filmsService: FilmsService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: CacheStore,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.filmsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
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
  async update(@Param('id') id: string, @Body() updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
