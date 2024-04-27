import { Injectable } from '@nestjs/common';
import { CreateFilmDto } from '../dto/create-film.dto';
import { UpdateFilmDto } from '../dto/update-film.dto';
import { EntityManager, Repository } from 'typeorm';
import { Film } from '../entities/film.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Director } from '../entities/director.entity';
import { Genre } from '../entities/genre.entity';
import { Actor } from '../entities/actor.entity';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmsRepository: Repository<Film>,
    @InjectRepository(Director)
    private readonly directorsRepository: Repository<Director>,
    @InjectRepository(Genre)
    private readonly genresRepository: Repository<Genre>,
    @InjectRepository(Actor)
    private readonly actorsRepository: Repository<Actor>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    const directors = await this.verifyDirectors(createFilmDto.directors);

    const genres = await this.verifyerGenres(createFilmDto.genres);

    const actors = await this.verifyActors(createFilmDto.actors);

    const film = new Film({
      ...createFilmDto,
      directors: await Promise.all(directors),
      genres: await Promise.all(genres),
      actors: await Promise.all(actors),
    });
    return await this.filmsRepository.save(this.filmsRepository.create(film));
  }

  async findAll() {
    return this.filmsRepository.find();
  }

  async findOne(id: number) {
    return this.filmsRepository.findOne({
      where: { id },
      relations: { directors: true, genres: true, actors: true },
    });
  }

  async update(id: number, updateFilmDto: UpdateFilmDto) {
    const film = await this.filmsRepository.findOneBy({ id });

    const directors = await this.verifyDirectors(updateFilmDto.directors);

    const genres = await this.verifyerGenres(updateFilmDto.genres);

    const actors = await this.verifyActors(updateFilmDto.actors);

    film.name = updateFilmDto.name;
    film.genres = await Promise.all(genres);
    film.releaseYear = updateFilmDto.releaseYear;
    film.directors = await Promise.all(directors);
    film.actors = await Promise.all(actors);

    //this.filmsRepository.merge(film, updateFilmDto)

    return await this.filmsRepository.save(film);
  }

  async verifyerGenres(genres: Genre[]) {
    return genres.map(async (createGenreDto) => {
      const genre = await this.genresRepository.findOne({
        where: createGenreDto,
      });
      if (genre) return genre;
      return new Genre(createGenreDto);
    });
  }

  async verifyDirectors(directors: Director[]) {
    return directors.map(async (createDirectorDto) => {
      const director = await this.directorsRepository.findOne({
        where: createDirectorDto,
      });
      if (director) return director;
      return new Director(createDirectorDto);
    });
  }

  async verifyActors(actors: Actor[]) {
    return actors.map(async (createActorDto) => {
      const actor = await this.actorsRepository.findOne({
        where: createActorDto,
      });
      if (actor) return actor;
      return new Actor(createActorDto);
    });
  }

  async remove(id: number) {
    return this.filmsRepository.delete(id);
  }
}
