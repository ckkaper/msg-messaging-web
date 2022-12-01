
import * as sinon from 'sinon';
import { FileStrategy }  from '../../../src/repositories/strategies/fileStrategy';
import * as utils from '../../../src/repositories/utils/fileReaderWrapper';
import { assert } from 'chai';

interface IEntity {
    id: string
}

interface ITestEntity extends IEntity {
    testProperty: string
}

const mockFileData = 
    [
        {id: '1', testProperty: 'someTest'},
        {id: '2', testProperty: 'someTest2'}
    ];

describe('fileStrategy tests', () => {

    var readFileJsonSandbox = sinon.createSandbox();
    var WriteFileSandbox = sinon.createSandbox();
    beforeEach(() => {
        readFileJsonSandbox.stub(utils, 'readJsonFromFile')
            .callsFake(() => [
                {id: '1', testProperty: 'someTest'},
                {id: '2', testProperty: 'someTest2'}   
            ]);
        WriteFileSandbox.stub(utils, 'writeFile');
    });
    
    afterEach(() => {
        readFileJsonSandbox.restore();
        WriteFileSandbox.restore();
    })
    

    it('constructor should read data file', () => {

        new FileStrategy('somePath');

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
    });
    
    it('should add entity', () => {
        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var addResult = fileStrategy.add(
            {
                id: '3',
                testProperty: 'someProperty'
            })
       
        var result = fileStrategy.list();
        
        console.log(result);
        var findAdded = result.find((entity) => entity.id == '3');

        assert.equal(findAdded?.testProperty , 'someProperty');
        assert.isTrue(addResult)

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
        WriteFileSandbox.assert.calledOnce(utils.writeFile as any);
    });
    
    it('should remove entity', () => {

        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        var result0 = fileStrategy.list();
        assert.equal(result0.length, mockFileData.length);
        
        var result1 = fileStrategy.remove('1');
        assert.isTrue(result1);

        var result2 = fileStrategy.list();

        console.log('mockFileData after remove');
        console.log(mockFileData);
        assert.equal(result2.length, mockFileData.length - 1, 'mockData should be reduced by 1');
        assert.isTrue(result1);

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
        WriteFileSandbox.assert.calledOnce(utils.writeFile as any);
    });

    it('should update entity', () => {

        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var entityToUpdate: ITestEntity = {
            id: 'someId',
            testProperty: 'someTestUpdated'
        }
        var updateResponse = fileStrategy.update(entityToUpdate);

        var updated = fileStrategy.list();

        var rs = updated.find((entity) => entity.id == 'someId');

        assert.equal(rs?.testProperty,'someTestUpdated', 'updated value is not correct')
        assert.equal(updateResponse, entityToUpdate);
        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
        WriteFileSandbox.assert.calledOnce(utils.writeFile as any);
    });

    it('should retrieve all available entities', () => {

        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var list = fileStrategy.list();

        assert.equal(list.length, mockFileData.length, 'returned items differ from actual items')

        readFileJsonSandbox.assert.calledOnce(utils.readJsonFromFile as any);
    });
});