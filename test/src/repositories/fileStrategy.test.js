"use strict";
exports.__esModule = true;
var sinon = require("sinon");
var fs = require("fs");
var fileStrategy_1 = require("c:/dev/messaging-app/skeleton-svc/src/repositories/fileStrategy");
var console_1 = require("console");
describe('fileStrategy tests', function () {
    it('constructor should read data file', function () {
        var stub = sinon.stub(fs, 'readFileSync').callsFake(function () {
            return JSON.stringify({ some: 'data' });
        });
        new fileStrategy_1.FileStrategy('somePath');
        (0, console_1.assert)(stub.calledOnce);
        stub.restore();
    });
    it('should add entity', function () {
        var readFileStub = sinon.stub(fs, 'readFileSync').callsFake(function () {
            var fileData = [{ id: 'someId', testProperty: 'someTest' }];
            return JSON.stringify(fileData);
        });
        var writeFileStub = sinon.stub(fs, 'writeFileSync');
        var fileStrategy = new fileStrategy_1.FileStrategy('somePath');
        var result = fileStrategy.add({
            id: '2',
            testProperty: 'someProperty'
        });
        (0, console_1.assert)(readFileStub.calledOnce);
        (0, console_1.assert)(writeFileStub.calledOnce);
        (0, console_1.assert)(result == true);
        readFileStub.restore();
        writeFileStub.restore();
    });
    it('should remove entity', function () {
        var readFileStub = sinon.stub(fs, 'readFileSync').callsFake(function () {
            var fileData = [{ id: 'someId', testProperty: 'someTest' }];
            return JSON.stringify(fileData);
        });
        var writeFileStub = sinon.stub(fs, 'writeFileSync');
        var fileStrategy = new fileStrategy_1.FileStrategy('somePath');
        var result = fileStrategy.remove('someId');
        (0, console_1.assert)(readFileStub.calledOnce);
        (0, console_1.assert)(writeFileStub.calledOnce);
        (0, console_1.assert)(result == true);
        readFileStub.restore();
        writeFileStub.restore();
    });
});
