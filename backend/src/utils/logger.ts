const logger = {
    info: (msg: string) => console.log(`[INFO] ${msg}`),
    error: (msg: string) => console.error(`[ERROR] ${msg}`),
    warn: (msg: string) => console.warn(`[WARN] ${msg}`),
    debug: (msg: string) => console.log(`[DEBUG] ${msg}`)
};

export const logInfo = (message: string) => {
    logger.info(message);
};

export const logError = (message: string) => {
    logger.error(message);
};

export const logDebug = (message: string) => {
    logger.debug(message);
};

export default logger;