export function formatApolloError(formattedError, error) {
    if (formattedError.extensions?.stacktrace) {
        delete formattedError.extensions.stacktrace;
    }
    if (error.originalError?.statusCode) {
        const customError = error.originalError;
        return {
            message: customError.message,
            locations: formattedError.locations,
            path: formattedError.path,
            extensions: {
                code: getErrorCode(customError.statusCode),
                statusCode: customError.statusCode,
            },
        };
    }
    return formattedError;
}
function getErrorCode(statusCode) {
    const codeMap = {
        400: 'BAD_USER_INPUT',
        401: 'UNAUTHENTICATED',
        403: 'FORBIDDEN',
        404: 'NOT_FOUND',
        409: 'CONFLICT',
        500: 'INTERNAL_SERVER_ERROR',
    };
    return codeMap[statusCode] || 'INTERNAL_SERVER_ERROR';
}
//# sourceMappingURL=errorformatter.js.map