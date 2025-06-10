import type { Plugin } from 'vite';
import fs from 'fs';

interface ViteDevLoggerOptions {
    /**
     * The URL path where the logs will be served. defaults to `/dev-logger`.
     */
    url?: string;
    /**
     * The folder where logs will be stored.
     * defaults to 'logs'.
     */
    outputFolder?: string;
    /**
     * The name of the output file where logs will be stored.
     * defaults to 'dev-log''.
     */
    outputFileName?: string;
}

const defaultOptions: ViteDevLoggerOptions = {
    url: '/dev-logger',
    outputFolder: 'logs',
    outputFileName: 'dev-log',
};

export default function viteDevLogger(
    options?: Partial<ViteDevLoggerOptions>
): Plugin {
    const pluginOptions: ViteDevLoggerOptions = {
        ...defaultOptions,
        ...options,
    };
    if (!fs.existsSync(pluginOptions.outputFolder as string)) {
        fs.mkdirSync(pluginOptions.outputFolder as string);
    }
    const todayDate = new Date().toISOString().split('T')[0];
    return {
        name: 'vite-dev-logger',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url !== pluginOptions.url) {
                    next();
                    return;
                }
                let body = '';
                req.on('data', (chunk) => {
                    body += chunk.toString();
                });
                req.on('end', () => {
                    try {
                        const data = JSON.parse(body);
                        fs.appendFileSync(
                            `${pluginOptions.outputFolder}/${pluginOptions.outputFileName}${todayDate}.log`,
                            JSON.stringify(data, null, 0) + '\n'
                        );
                        res.statusCode = 200;
                        res.end();
                    } catch (error) {
                        console.error(error);
                        res.statusCode = 400;
                        res.end(
                            'Invalid JSON, please send a valid JSON object.'
                        );
                    }
                });
            });
        },
    };
}
