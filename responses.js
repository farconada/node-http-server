export function sendError(response, code, detail) {
    response.statusCode = code;
    switch (code) {
        case 404:
            response.write('<h1>Error 404: Not Found</h1>');
            break;
        case 500:
            response.write('<h1>Error 404: Internal error</h1>');
            break;
        case 501:
            response.write('<h1>Error 404: Not implemented</h1>');
            break;
        default:
            response.write('<h1>Error ' + code + '</h1>');
            break;
    }
    response.write('<p>' + detail + '</p>');
    return response;
}