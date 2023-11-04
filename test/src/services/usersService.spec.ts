import { assert } from "chai";
import { FileStrategy } from "../../../src/repositories/strategies/fileStrategy";
import * as sinon from "sinon";
import UsersService from "../../../src/services/usersService";
import IUserEntity from "../../../src/repositories/Entities/userEntity";
import IRepositoryStrategy from "../../../src/repositories/interfaces/IRepositoryStrategy";
import { InternalServerErrorApiError } from "../../../src/utils/apiError";

const mockEntity = {
    id: "someId",
    firstName: "someFirstName",
    lastName: "lastName",
};

class MockStrategy implements IRepositoryStrategy<IUserEntity> {
    constructor() {}

    list(): Array<IUserEntity> {
        return [mockEntity];
    }

    add(entity: IUserEntity) {
        return true;
    }

    remove(id: string) {
        return true;
    }

    update(entity: IUserEntity) {
        return mockEntity;
    }

    get(id: string) {
        return mockEntity;
    }
}

describe("usersService tests", () => {
    let mockStrategy: MockStrategy;
    let mockStrategyStub = sinon.createSandbox();

    beforeEach(() => {
        mockStrategy = new MockStrategy();
        mockStrategyStub.stub(mockStrategy, "get").callsFake((id: string) => {
            return mockEntity;
        });

        mockStrategyStub.stub(mockStrategy, "add").callsFake(() => {
            return true;
        });
    });

    afterEach(() => {
        mockStrategyStub.restore();
    });

    it("should instantiate usersService", () => {
        new UsersService(mockStrategy);
    });

    it("shoult get single user", () => {
        var usersService = new UsersService(mockStrategy);

        var result = usersService.getUser("someId");

        assert.deepEqual(result, mockEntity);
    });

    it("should get multiple users", () => {
        var usersService = new UsersService(mockStrategy);

        var result = usersService.getAllUsers();

        assert.deepEqual(result, [mockEntity]);
    });
});

describe("Negative: usersService tests", () => {
    let mockStrategy: MockStrategy;
    let mockStrategyStub = sinon.createSandbox();

    beforeEach(() => {
        mockStrategy = new MockStrategy();
        mockStrategyStub
            .stub(mockStrategy, "get")
            .throwsException(
                new InternalServerErrorApiError("failed to get user")
            );

        mockStrategyStub
            .stub(mockStrategy, "list")
            .throwsException(
                new InternalServerErrorApiError("failed to get list of users")
            );
    });

    afterEach(() => {
        mockStrategyStub.restore();
    });

    it("should throw when trying to get single user", () => {
        var usersService = new UsersService(mockStrategy);

        assert.throws(() => {
            usersService.getUser("someID");
        });
    });

    it("should throw when try to get multiple users", () => {
        var usersService = new UsersService(mockStrategy);

        assert.throws(() => {
            usersService.getAllUsers();
        });
    });
});
