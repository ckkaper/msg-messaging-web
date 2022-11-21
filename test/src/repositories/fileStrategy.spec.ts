const sinon = require('sinon')

import { FileStrategy }  from '../../../src/repositories/fileStrategy';
import * as utils from '../../../src/repositories/utils/fileReaderWrapper';
import { assert } from 'chai';


interface IEntity {
    id: string
}

describe('fileStrategy tests', () => {


    it('constructor should read data file', () => {
        var stub = sinon.stub(utils, 'readJsonFromFile').callsFake(() => {
        });

        new FileStrategy('somePath');

        assert(stub.calledOnce)        
        stub.restore();
    });
    
    it('should add entity', () => {
        interface ITestEntity extends IEntity {
            testProperty: string
        }

        var readFileStub = sinon.stub(utils, 'readJsonFromFile').callsFake(() => {
            const fileData: ITestEntity[] = [{id: "someId", testProperty: "someTest"}];
            return JSON.parse(JSON.stringify(fileData));
        });

        var writeFileStub = sinon.stub(utils, 'writeFile');
        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var addResult = fileStrategy.add(
            {
                id: '2',
                testProperty: 'someProperty'
            })
       
        var result = fileStrategy.list();
        
        console.log(result);
        var findAdded = result.find((entity) => entity.id == '2');

        assert.equal(findAdded?.testProperty , 'someProperty');

        assert(readFileStub.calledOnce);
        assert(writeFileStub.calledOnce);
        assert(addResult == true)
        readFileStub.restore();
        writeFileStub.restore();
    });
    
    it('should remove entity', () => {
        interface ITestEntity extends IEntity {
            testProperty: string
        }

        var readFileStub = sinon.stub(utils, 'readJsonFromFile').callsFake(() => {
            const fileData: ITestEntity[] = [{id: 'someId', testProperty: 'someTest'}];
            return JSON.parse(JSON.stringify(fileData));
        });

        var writeFileStub = sinon.stub(utils, 'writeFile');
        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        var result0 = fileStrategy.list();
        assert.equal(result0.length, 1);
        
        var result1 = fileStrategy.remove('someId');
        
        var result2 = fileStrategy.list();

        assert.equal(result2.length, 0)

        assert(readFileStub.calledOnce);
        assert(writeFileStub.calledOnce);
        assert.isTrue(result1);
        readFileStub.restore();
        writeFileStub.restore();
    });

    it('should remove entity', () => {
        interface ITestEntity extends IEntity {
            testProperty: string
        }

        var readFileStub = sinon.stub(utils, 'readJsonFromFile').callsFake(() => {
            const fileData: ITestEntity[] = [{id: 'someId', testProperty: 'someTest'}];
            return JSON.parse(JSON.stringify(fileData));
        });

        var writeFileStub = sinon.stub(utils, 'writeFile');
        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var result = fileStrategy.remove('someId');
        
        assert(readFileStub.calledOnce);
        assert(writeFileStub.calledOnce);
        assert(result == true)
        readFileStub.restore();
        writeFileStub.restore();
    });

    it('should update entity', () => {
        interface ITestEntity extends IEntity {
            testProperty: string
        }

        var readFileStub = sinon.stub(utils, 'readJsonFromFile').callsFake(() => {
            const fileData: ITestEntity[] = [{id: 'someId', testProperty: 'someTest'}];
            return JSON.parse(JSON.stringify(fileData));
        });

        var writeFileStub = sinon.stub(utils, 'writeFile');
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
        assert(readFileStub.calledOnce);
        assert(writeFileStub.calledOnce);

        readFileStub.restore();
        writeFileStub.restore();
    });

    it('should retrieve all available entities', () => {
        interface ITestEntity extends IEntity {
            testProperty: string
        }

        var readFileStub = sinon.stub(utils, 'readJsonFromFile').callsFake(() => {
            const fileData: ITestEntity[] = [
                {id: '1', testProperty: 'someTest'},
                {id: '2', testProperty: 'someTest2'}
            ];
            return JSON.parse(JSON.stringify(fileData));
        });

        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var list = fileStrategy.list();

        assert.equal(list.length, 2, 'returned items differ from actual items')

        assert(readFileStub.calledOnce);

        readFileStub.restore();
    });
});