import { basename } from "path";
import IEntity from "./Entities/entity";
import IUserEntity from "./Entities/userEntity";
import IRepositoryStrategy from "./interfaces/IRepositoryStrategy";
import Repository from "./repository";

type UserEntityType = IUserEntity & IEntity;

class UsersRpository<UserEntityType> extends Repository<UserEntityType> {

    constructor(strategy: IRepositoryStrategy<UserEntityType>) {
        super(strategy);
    }

    public getUserList() {
        return this.strategy.list();
    }
    
    public getUser(id: string) {
        return this.strategy.get(id);
    }
}

export default UsersRpository<UserEntityType>