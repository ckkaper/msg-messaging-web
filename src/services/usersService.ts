import IEntity from "../repositories/Entities/entity";
import IUserEntity from "../repositories/Entities/userEntity";
import { FileStrategy } from "../repositories/fileStrategy";
import IRepositoryStrategy from "../repositories/interfaces/IRepositoryStrategy";
import path from 'path';
import UsersRepository from "../repositories/usersRepository";

class UsersService {

    private repository: any;

    private repositoryStrategy: any;

    constructor(strategy?: IRepositoryStrategy<IUserEntity>) {
       this.repositoryStrategy = strategy ? strategy : new FileStrategy("C:\\dev\\messaging-app\\skeleton-svc\\src\\repositories\\mock_data.json");
       this.repository = new UsersRepository(this.repositoryStrategy);
    }

    public getUser(id: string): IUserEntity {
        console.log(`getting user: ${id}`);
        return this.repository.getUser(id);
    }
    
    public getAllUsers(): Array<IUserEntity> {
        console.log('getting users...');
        return this.repository.list();
    }
}

export default UsersService;