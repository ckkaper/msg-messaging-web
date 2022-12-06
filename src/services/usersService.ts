import IUserEntity from "../repositories/Entities/userEntity";
import { FileStrategy } from "../repositories/strategies/fileStrategy";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import {
        UsersRepository,
        UserEntityType,
} from "../repositories/usersRepository";
import { logger } from "../config/logger";
import path from "path";

class UsersService {
        private repository: UsersRepository<UserEntityType>;

        private repositoryStrategy: IRepositoryStrategy<IUserEntity>;

        constructor(strategy?: IRepositoryStrategy<IUserEntity>) {
                this.repositoryStrategy = strategy
                        ? strategy
                        : new FileStrategy(
                                  path.join(
                                          __dirname,
                                          "../repositories/mock_data.json"
                                  )
                          );
                this.repository = new UsersRepository(this.repositoryStrategy);
        }

        public getUser(id: string): IUserEntity {
                logger.info(`getting user: ${id}`);
                return this.repository.getUser(id);
        }

        public getAllUsers(): Array<IUserEntity> {
                logger.info(`getting all users`);
                return this.repository.getUserList();
        }
}

export default UsersService;
