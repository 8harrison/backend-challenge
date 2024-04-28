import { Actor } from "src/entities/actor.entity";
import { Director } from "src/entities/director.entity";
import { Film } from "src/entities/film.entity";
import { Genre } from "src/entities/genre.entity";

const genres = [new Genre({ name: 'Adventure' }), new Genre({ name: 'Action' })]
const directors = [new Director({ name: 'Gore Verbinski' })]
const actors = [
    new Actor({ name: 'Johnny Depp' }),
    new Actor({ name: 'Geoffrey Rush' }),
    new Actor({ name: 'Orlando Bloom' }),
    new Actor({ name: 'Keira Knightley' }),
    new Actor({ name: 'Jonathan Pryce' })]

const description =
    `Will, a blacksmith, joins forces with Captain Jack Sparrow, a pirate, to rescue the love of his life from 
    Jack's associates, who have kidnapped her suspecting she has his medallion.`


const film = new Film({
    name: 'Pirates of the Caribbean',
    releaseYear: 2003,
    genres,
    directors,
    actors,
    description,
    id: 1
})

export {
    genres,
    directors,
    actors,
    description,
    film,
};