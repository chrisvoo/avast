import { Express, Request } from 'express';
import { Server } from 'http';

export type PhotoesQueryParams = {
    cursor: string
    limit: number
 }

export type PhotoesParams = {
    id: string
}

export type PhotoRequest = Request<{}, {}, {}, Partial<PhotoesQueryParams>>

export type ExpressApp = {
    server: Server
    app: Express
}

export type Photo = {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
}

export type PhotoList = {
    cursor: string
    data: Photo[]
}
