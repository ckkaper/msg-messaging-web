import { expect } from "chai";
import * as sinon from "sinon";
import { authorizationMiddleware } from "../../../src/middlewares/authorizationMiddleware";
import {Request } from "express";



describe("AuthorizationMiddleware tests", () => {
    
    it('On provided session should call redirect', () => {
        // Arrange
        const nextSpy = sinon.spy();
        const  req: Request = {
            cookies: {
                sessionId: 'Something'
            }
        } as Request
        const res = {
            redirect: sinon.spy()
        } as any;

        req.cookies.sessionId = 'something'

        // Act
        authorizationMiddleware(req, res , nextSpy )

        // Assert
        expect(nextSpy.calledOnce).to.be.true; 
        expect(res.redirect.notCalled).to.be.true;
    });

    it('On empty session should redirect to home page', () => {
        // Arrange
        const nextSpy = sinon.spy();

        const  req: Request = {
            cookies: {
                sessionId: 'Something'
            }
        } as Request
        const res = {
            redirect: sinon.spy()
        } as any;

        req.cookies.sessionId = null

        // Act
        authorizationMiddleware(req, res , nextSpy )

        // Assert
        expect(nextSpy.notCalled).to.be.true; 
        expect(res.redirect.calledOnce).to.be.true
    });
});