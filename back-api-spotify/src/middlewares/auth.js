/* eslint-disable consistent-return */
import { StatusCodes } from "http-status-codes";
import pkg from "jsonwebtoken";
const { decode, verify } = pkg;

function setParamsFromJWT(req) {
    const { authorization } = req.headers;
    const [, jwtoken] = authorization.split(" ");

    const decoded = decode(jwtoken);

    req.query.IS_ASYNC = !!decoded.IS_ASYNC;
}
// eslint-disable-next-line consistent-return
export default function verifyJWT(req, res, next) {
    const numParts = 2; // Bearer + token info
    const authHeader = req.headers.authorization;
    const startedAt = new Date();

    if (!authHeader) {
        const response = {
            statusCode: StatusCodes.UNAUTHORIZED,
            auth: false,
            message: `${StatusCodes.UNAUTHORIZED} No token provided.`,
        };

        return res
            .status(response.statusCode)
            .send(response);
    }

    const parts = authHeader.split(" ");

    if (parts.length !== numParts) {
        const response = {
            statusCode: StatusCodes.BAD_REQUEST,
            auth: false,
            message: `${StatusCodes.BAD_REQUEST} No token provided.`,
        };
        return res
            .status(response.statusCode)
            .send(response);
    }

    const [, token] = parts;

    try {
        verify(token, process.env.SECRET);
        setParamsFromJWT(req);
    } catch (err) {
        const response = {
            statusCode: StatusCodes.UNAUTHORIZED,
            auth: false,
            message: `${StatusCodes.UNAUTHORIZED} Failed to authenticate token.`,
        };
        return res
            .status(response.statusCode)
            .send(response);
    }
    return next();
}