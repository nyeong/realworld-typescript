import { UserController } from "@/user/user.controller";
import { UserService } from "@/user/user.service";

describe('UserController (e2e)', () => {
    let userService: UserService;
    let userController: UserController;


    beforeAll(async () => {
        userService = new UserService();
        userController = new UserController(userService);
    });

    describe('POST /users', () => {
        it('POST /users', async () => {
            const res = await request(app.getHttpServer())
                .post('/users')
                .send({
                    user: {
                        email: 'email',
                        password: 'password',
                        username: 'username'
                    }
                })

            expect(res.status).toBe(201);
        });
    })
});
