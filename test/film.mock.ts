import { Film } from '../src/entities/film.entity';
import { CreateFilmDto } from '../src/dto/create-film.dto';
import { Actor } from '../src/entities/actor.entity';
import { Director } from '../src/entities/director.entity';
import { Genre } from '../src/entities/genre.entity';

const actors = [
  'Emily Browning',
  'Abbie Cornish',
  'Jena Malone',
  'Vanessa Hudgens',
  'Jamie Chung',
  'Carla Gugino',
  'Oscar Isaac',
  'Jon Hamm',
  'Scott Glenn',
];

const directors = ['Zack Snyder'];

const genres = ['Action', 'Thriller'];

const mockFilm = new Film({
  name: 'Sucker Punch',
  actors: actors.map((name) => new Actor({ name })),
  directors: directors.map((name) => new Director({ name })),
  genres: genres.map((name) => new Genre({ name })),
  releaseYear: 2011,
  description: `Babydoll faces a dark, unknown fate as she waits for a drastic brain surgery at a mental asylum. 
    Reality and fantasy merge as she devises a getaway plan with four other girls.`,
});

const superActors = [
  'Marlon Brando',
  'Gene Hackman',
  'Christopher Reeve',
  'Ned Beatty',
  'Jackie Cooper',
  'Glenn Ford',
  'Trevor Howard',
  'Margot Kidder',
  'Valerie Perrine',
  'Maria Schell',
  'Terence Stamp',
  'Phyllis Thaxter',
  'Susannah York',
];

const mockFilm2 = new Film({
  name: 'Superman',
  releaseYear: 1978,
  description: `Scientist Jor-El rockets his infant son, Kal-El, to safety on Earth. Kal is raised as Clark Kent and develops 
    unusual abilities and powers to become Superman who fights for truth and justice.`,
  genres: [new Genre({ name: 'Action' }), new Genre({ name: 'Adventure' })],
  directors: [new Director({ name: 'Richard Donner' })],
  actors: superActors.map((name) => new Actor({ name })),
});

const meuMalvadoActors = [
  'Steve Carell',
  'Jason Segel',
  'Russell Brand',
  'Julie Andrews',
  'Will Arnett',
  'Kristen Wiig',
  'Miranda Cosgrove',
  'Dana Gaier',
  'Elsie Fisher',
];

const mockFilm3 = new Film({
  name: 'Meu Malvado Favorito',
  releaseYear: 2010,
  description: `Gru, a criminal mastermind, adopts three orphans as pawns to carry out the biggest heist in history. His life takes 
    an unexpected turn when the little girls see the evildoer as their potential father`,
  genres: [new Genre({ name: 'Family' }), new Genre({ name: 'Comedy' })],
  directors: [
    new Director({ name: 'Pierre Coffin' }),
    new Director({ name: 'Chris Renaud' }),
  ],
  actors: meuMalvadoActors.map((name) => new Actor({ name })),
});

const xActors = [
  new Actor({ name: 'Takeru Sato' }),
  new Actor({ name: 'Emi Takei' }),
  new Actor({ name: 'Kōji Kikkawa' }),
  new Actor({ name: 'Yū Aoi' }),
  new Actor({ name: 'Munetaka Aoki' }),
  new Actor({ name: 'Gō Ayano' }),
  new Actor({ name: 'Eiji Okuda' }),
  new Actor({ name: 'Yōsuke Eguchi' }),
  new Actor({ name: 'Teruyuki Kagawa' }),
];

const xDirectors = [new Director({ name: 'Keishi Ohtomo' })];

const xGenres = [
  new Genre({ name: 'Action' }),
  new Genre({ name: 'Adventure' }),
];

const data: CreateFilmDto = {
  name: 'Samurai X',
  releaseYear: 2012,
  description: `A serial killer fabricates evidence against a former assassin, who promises to stop the killings 
    by seeking help from a legendary street fighter.`,
  genres: xGenres,
  directors: xDirectors,
  actors: xActors,
};

export { mockFilm, mockFilm2, mockFilm3, data, xActors, xDirectors, xGenres };
