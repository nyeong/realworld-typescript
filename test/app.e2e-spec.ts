import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Users', () => {

    const randomNumber = Math.floor(Math.random() * 100)
    const username = `UserNameTest${randomNumber}`
    const email = `test${randomNumber}@example.com`
    const password = 'MyPassword'

    describe('[POST /users] Registration', () => {
      it('should create user', () => {
        return request(app.getHttpServer())
          .post('/users')
          .send({ user: { email, password, username } })
          .expect(201)
          .expect(res => {
            expect(res.body.user.email).toEqual(email)
            expect(res.body.user.username).toEqual(username)
            expect(res.body.user.password).toBeUndefined()
            expect(res.body.user.token).toBeDefined()
            expect(res.body.user.token).not.toEqual('')
            expect(res.body.user.bio).toBeDefined()
            expect(res.body.user.image).toBeDefined()
          });
      })
    });
  })
});
