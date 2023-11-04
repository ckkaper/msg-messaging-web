import * as sinon from "sinon";
import { FileStrategy } from "../../../src/repositories/strategies/fileStrategy";
import * as utils from "../../../src/repositories/utils/fileReaderWrapper";
import { assert } from "chai";

interface IEntity {
    id: string;
}

interface ITestEntity extends IEntity {
    testProperty: string;
}

const mockFileData = [
    { id: "1", testProperty: "someTest" },
    { id: "2", testProperty: "someTest2" },
];

describe("fileStrategy tests", () => {
    const readFileJsonSandbox = sinon.createSandbox();
    const WriteFileSandbox = sinon.createSandbox();

    beforeEach(() => {
        readFileJsonSandbox.stub(utils, "readJsonFromFile").callsFake(() => [
            {
                id: "1",
                testProperty: "someTest",
            },
            {
                id: "2",
                testProperty: "someTest2",
            },
        ]);
        WriteFileSandbox.stub(utils, "writeFile");
    });

    afterEach(() => {
        readFileJsonSandbox.restore();
        WriteFileSandbox.restore();
    });

    it("constructor should read data file", () => {
        new FileStrategy("somePath");

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
    });

    it("should add entity", () => {
        const fileStrategy = new FileStrategy<ITestEntity>("somePath");

        const addResult = fileStrategy.add({
            id: "3",
            testProperty: "someProperty",
        });

        const result = fileStrategy.list();

        console.log(result);
        const findAdded = result.find((entity) => entity.id == "3");

        assert.equal(findAdded?.testProperty, "someProperty");
        assert.isTrue(addResult);

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
        WriteFileSandbox.assert.calledOnce(utils.writeFile as any);
    });

    it("should remove entity", () => {
        const fileStrategy = new FileStrategy<ITestEntity>("somePath");
        const result0 = fileStrategy.list();
        assert.equal(result0.length, mockFileData.length);

        const result1 = fileStrategy.remove("1");
        assert.isTrue(result1);

        const result2 = fileStrategy.list();

        console.log("mockFileData after remove");
        console.log(mockFileData);
        assert.equal(
            result2.length,
            mockFileData.length - 1,
            "mockData should be reduced by 1"
        );
        assert.isTrue(result1);

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
        WriteFileSandbox.assert.calledOnce(utils.writeFile as any);
    });

    it("should update entity", () => {
        const fileStrategy = new FileStrategy<ITestEntity>("somePath");

        const entityToUpdate: ITestEntity = {
            id: "someId",
            testProperty: "someTestUpdated",
        };
        const updateResponse = fileStrategy.update(entityToUpdate);

        const updated = fileStrategy.list();

        const rs = updated.find((entity) => entity.id == "someId");

        assert.equal(
            rs?.testProperty,
            "someTestUpdated",
            "updated value is not correct"
        );
        assert.equal(updateResponse, entityToUpdate);
        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
        WriteFileSandbox.assert.calledOnce(utils.writeFile as any);
    });

    it("should retrieve all available entities", () => {
        const fileStrategy = new FileStrategy<ITestEntity>("somePath");

        const list = fileStrategy.list();

        assert.equal(
            list.length,
            mockFileData.length,
            "returned items differ from actual items"
        );

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
    });
});

describe("Negative tests: fileStrategy constructor tests", () => {
    let readFileJsonSandbox = sinon.createSandbox();
    beforeEach(() => {
        readFileJsonSandbox.stub(utils, "readJsonFromFile").throws();
    });

    afterEach(() => {
        readFileJsonSandbox.restore();
    });

    it("should throw when trying to read all available entities", () => {
        assert.throws(() => {
            new FileStrategy<ITestEntity>("somePath");
        });
    });
});
