[![Status badge](https://github.com/ChenPeleg/vite-dev-logs/actions/workflows/playwright.yml/badge.svg?branch=main)](https://github.com/ChenPeleg/vite-dev-logs/actions/?query=branch%3Amain)
[![npm version](https://badge.fury.io/js/vite-dev-logs.svg)](https://badge.fury.io/js/vite-dev-logs)
[![Licence](https://img.shields.io/github/license/ChenPeleg/vite-dev-logs.svg?style=flat&colorA=18181B&colorB=28CF8D)](https://github.com/ChenPeleg/vite-dev-logs/LICENCE)
![NPM Downloads](https://img.shields.io/npm/d18m/vite-dev-logs)


# Vite Development Logger Plugin

A Vite plugin for creating local logs during development. Suited for AI Agents.

## The problem

When developing AI agents, it is often necessary to log browser errors. 
The AI Agent can tell if there are build errors, but it cannot see browser errors.


## The solution
This plugin provides a simple way to create local logs during development.
**Its soul purpose is to log browser errors to a local file, and make them available to the AI Agent.**

> Note: This plugin is not meant for production use. It is designed for development purposes only. For production logging, consider using a more robust solution.


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
 
  // ...other methods and state
}
```

## Options

You can customize the plugin's behavior by passing options to it:

```typescript
import { defineConfig } from 'vite';
import viteDevLogs from 'vite-dev-logs';
export default defineConfig({
  plugins: [viteDevLogs(
    {
        url: '/custom-logger', // Custom URL path for logs. defaults to `/dev-logger`.
        outputFolder: 'my-logs', // Custom folder for logs.  defaults to 'logs'.
        outputFileName: 'my-dev-log', // Custom file name for logs. defaults to 'dev-log'.
    }
  )],
});
```

## Working with AI Agents Example

### Creating a simple clear logs script (to minimize noise)
add a simple script to clear the logs before starting the AI Agent:

```json 
{
  "scripts": {
    "clear-logs":   "node -e \"require('fs').rmSync('logs', { recursive: true, force: true }); require('fs').mkdirSync('logs');\""
  }
}
```

### Using the logs with your AI Agent

After doing some work with the AI Agent, when you see a browser error, or any other unwanted behavior, you can run the AI Agent with the logs:

```prompt
Please analyze the logs in the `logs` folder and provide insights on how to fix the issues.
```

