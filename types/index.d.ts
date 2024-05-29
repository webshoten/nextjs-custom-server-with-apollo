import { IncomingHttpHeaders } from 'http';

declare module 'express-serve-static-core' {
    interface IncomingHttpHeaders {
        "Authorization"?: string
    }
}