# Vite Development Logger Plugin

A Vite plugin for creating local logs during development. Suited for AI Agents.

## The problem

When developing AI agents, it is often necessary to log browser errors. 
The AI Agent can tell if there are build errors, but it cannot see browser errors.


## The solution
This plugin provides a simple way to create local logs during development.
**Its soul purpose is to log browser errors to a local file, and make them available to the AI Agent.**


## Installation

```bash
npm install vite-dev-logs --save-dev
```


## Don't want to install? Copy past one file

The whole plugin is in one file, so you can copy-paste it into your project without installing it:

[vite-dev-logs.ts](https://github.com/ChenPeleg/vite-dev-logs/blob/main/src/index.ts)

You can also tweak the code to your needs, as it is open source.


## Usage

Add the plugin to your Vite configuration file:

```typescript
import { defineConfig } from 'vite';
import viteDevLogs from 'vite-dev-logs';
export default defineConfig({
  plugins: [viteDevLogs()],
});
```

## Sending logs to the development server

To send logs to the development server, you can create a simple function that sends logs to the default endpoint `/dev-logger`.

```typescript
// src/development/log-development.ts
const logDevelopment = (log : Record<string, any>) =>
    process.env.NODE_ENV === 'development' && fetch('/dev-logger', {
        method: 'POST',
        body: JSON.stringify({
            log
        }),
    });
```

## Example usage

Inside your application, you can use the `logDevelopment` function to send logs to the development server:

```typescript
import { logDevelopment } from './development/log-development';

logDevelopment({
    message: 'This is a development only log',
    level: 'info',
    timestamp: new Date().toISOString(),
});
```

Using with React's Error boundaries:

```tsx
import { logDevelopment } from './development/log-development';
import React from 'react';

class ErrorBoundary extends React.Component {
 
   
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        logDevelopment({
            message: error.message,
            stack: error.stack,
            errorInfo,
            level: 'error',
            timestamp: new Date().toISOString(),
        });
    }
 
   ... // other methods and state
}

## 
