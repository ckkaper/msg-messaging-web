import * as sinon from 'sinon';
import * as fs from 'fs';
import * as mocha from 'mocha';

import  { FileStrategy }  from 'c:/dev/messaging-app/skeleton-svc/src/repositories/fileStrategy';
import { assert } from 'console';
interface IEntity {
    id: string
}

describe('fileStrategy tests', () => {

    it('constructor should read data file', () => {
        var stub = sinon.stub(fs, 'readFileSync').callsFake(() => {
            return JSON.stringify({some: 'data'});
        });

        new FileStrategy('somePath');

        assert(stub.calledOnce)        
        stub.restore();
    });
    
    it('should add entity', () => {
        interface ITestEntity extends IEntity {
            testProperty: string
        }

        var readFileStub = sinon.stub(fs, 'readFileSync').callsFake(() => {
            const fileData: ITestEntity[] = [{id: 'someId', testProperty: 'someTest'}];
            return JSON.stringify(fileData);
        });

        var writeFileStub = sinon.stub(fs, 'writeFileSync');
        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var result = fileStrategy.add(
            {
                id: '2',
                testProperty: 'someProperty'
            })
        
        assert(readFileStub.calledOnce);
        assert(writeFileStub.calledOnce);
        assert(result == true)
        readFileStub.restore();
        writeFileStub.restore();
    });
    
    it('should remove entity', () => {
        interface ITestEntity extends IEntity {
            testProperty: string
        }

        var readFileStub = sinon.stub(fs, 'readFileSync').callsFake(() => {
            const fileData: ITestEntity[] = [{id: 'someId', testProperty: 'someTest'}];
            return JSON.stringify(fileData);
        });

        var writeFileStub = sinon.stub(fs, 'writeFileSync');
        var fileStrategy = new FileStrategy<ITestEntity>('somePath');
        
        var result = fileStrategy.remove('someId');
        
        assert(readFileStub.calledOnce);
        assert(writeFileStub.calledOnce);
        assert(result == true)
        readFileStub.restore();
        writeFileStub.restore();
    });
});