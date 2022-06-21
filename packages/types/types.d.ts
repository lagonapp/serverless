/**
 * DO NOT EDIT
 * This file has been autogenerated by ./generate.mjs
 */

/* eslint-disable */

interface RequestInit {
    method?: string;
    headers?: Record<string, string | string[] | undefined>;
    body?: string;
}
declare class Request {
    method: string;
    headers: Record<string, string | string[] | undefined>;
    body?: string;
    url: string;
    constructor(input: string, options?: RequestInit);
    text(): Promise<string>;
    json<T>(): Promise<T>;
    formData(): Promise<Record<string, string>>;
}


interface ResponseInit {
    status?: number;
    statusText?: string;
    headers?: Record<string, string | string[] | undefined>;
    url?: string;
}
declare class Response {
    body: string;
    headers: Record<string, string | string[] | undefined>;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
    constructor(body: string, options?: ResponseInit);
    text(): Promise<string>;
    json<T>(): Promise<T>;
    formData(): Promise<Record<string, string>>;
}


declare class URL {
    hash: string;
    host: string;
    hostname: string;
    href: string;
    port: string;
    protocol: string;
    constructor(url: string, base?: string);
}





declare function fetch(resource: string, init: RequestInit): Promise<Response>;


declare const parseMultipart: (headers: Record<string, string | string[] | undefined>, body?: string | undefined) => Record<string, string>;


