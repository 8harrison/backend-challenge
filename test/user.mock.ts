import { User } from '../src/entities/user.entity';

const mockUser_1 = new User({ username: 'João Batista', password: '123456' });

const mockUser_2 = new User({ username: 'Judas Tadeu', password: 'abcdef' });

const mockUser_3 = new User({
  username: 'Judas Iscariotes',
  password: '987654',
});

const mockToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhhcnJpc29uIiwiaWF0IjoxNzE0MTc1NTk4LCJleHAiOjE3MTQyMzU1OTh9.yy6qr7fCqLQT3d-gILRtmnuD2l3zfztq_jTVnxOsVYE';

export { mockUser_1, mockUser_2, mockUser_3, mockToken };
