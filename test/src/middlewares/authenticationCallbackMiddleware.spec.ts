import { expect } from "chai";
import axios from "axios";
import * as sinon from "sinon";
import { authorizationMiddleware } from "../../../src/middlewares/authorizationMiddleware";
import { Request } from "express";
import authorizationCallbackMiddleware from "../../../src/middlewares/authorizationCallbackMiddleware";
import exp from "constants";

describe("AuthorizationCallbackMiddleware tests", () => {
    // const sandbox = sinon.createSandbox();

    beforeEach(() => {
        sinon
            .stub(axios, "post")
            .resolves(Promise.resolve({ data: "IdToken" }));
    });

    // TODO: add negative tests
    it("Should exchange authorization code with ID Token", async () => {
        // Arrange
        const nextSpy = sinon.spy();
        const req: Request = {
            query: {
                code: "someCode",
                redirect_uri: "someRedirectUri",
                sessionId: "someSessionId",
            } as Record<string, string>,
        } as Request;
        const res = {
            redirect: sinon.spy(),
            cookie: () => {
                console.log("noop");
            },
            set: () => {
                console.log("noop");
            },
        } as any;

        const resSetSpy = sinon.spy(res, "cookie");
        // Act
        await authorizationCallbackMiddleware(req, res, nextSpy);

        // Assert
        expect(nextSpy.notCalled).to.be.true;
        expect(res.redirect.calledOnce).to.be.true;
        expect(resSetSpy.args[0][0]).to.equal("sessionId");
        expect(resSetSpy.args[0][1]).to.equal("IdToken");
    });
});
