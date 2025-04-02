import { Express } from 'express';
import { Server } from 'http';

export interface ProxyRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  [key: string]: any;
}

export interface ProxyRouteConfig {
  targetUrl: string;
  options: ProxyRequestOptions;
}

export interface Proxy {
  app: Express;
  server: Server | null;
  routes: Map<string, ProxyRouteConfig>;
  
  start(port?: number): Proxy;

  stop(): Proxy;
  
  addRoute(localPath: string, targetUrl: string, options?: ProxyRequestOptions): Proxy;
  

  setupRoutes(): void;

  setupRoute(localPath: string, targetUrl: string, options?: ProxyRequestOptions): void;
}

export declare const proxy: Proxy;