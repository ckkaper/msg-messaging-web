import winston from "winston";

const myFormat = winston.format.printf(
    ({ level, message, label, timestamp }) => {
        return `[${timestamp}] [${level}] ${message}`;
    }
);

export const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "log/log.log" }),
    ],
    format: winston.format.combine(
        winston.format.timestamp({ format: "MM/DD HH:mm:ss.SSS" }),
        myFormat
    ),
});
