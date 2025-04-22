# Vite Vue 3 SSR Starter

A starter template for building Vue 3 applications with Server-Side Rendering (SSR) using Vite and Express.

## Features

- 🚀 Vue 3 with Server-Side Rendering
- ⚡ Vite for fast development and building
- 🔧 TypeScript support
- 🛠️ Express.js server
- 📦 ES Modules
- 🔄 Hot Module Replacement (HMR)

## Project Structure

```
.
├── src/                # Source files
│   ├── App.vue         # Root Vue component
│   ├── main.ts         # Client entry point
│   └── entry-server.ts # Server entry point
├── server/             # Server implementation
│   └── index.ts        # Express server
├── docs/               # Documentation
│   ├── vite-config.md  # Vite configuration
│   ├── main-entry.md   # Client entry point
│   ├── server-entry.md # Server entry point
│   ├── app-component.md # Root component
│   ├── server-implementation.md # Server setup
│   ├── typescript-config.md # TypeScript setup
│   ├── vue-type-definitions.md # Vue types
│   └── package-config.md # Dependencies and scripts
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── shims-vue.d.ts      # Vue type definitions
└── package.json        # Project dependencies
```

## Documentation

To understand this project thoroughly, please read the documentation in the following order:

1. [Package Configuration](docs/package-config.md) - Start here to understand the project's dependencies and scripts
2. [Vite Configuration](docs/vite-config.md) - Learn how the build system is configured
3. [TypeScript Configuration](docs/typescript-config.md) - Understand the TypeScript setup
4. [Vue Type Definitions](docs/vue-type-definitions.md) - Learn about Vue's TypeScript support
5. [Root Component](docs/app-component.md) - See how the main Vue component is structured
6. [Client Entry Point](docs/main-entry.md) - Understand how the client-side app starts
7. [Server Entry Point](docs/server-entry.md) - Learn about server-side rendering
8. [Server Implementation](docs/server-implementation.md) - See how the Express server works

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vite-vue-ssr-starter.git
cd vite-vue-ssr-starter

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The development server will start at `http://localhost:3000` with hot module replacement enabled.

### Production

```bash
# Build for production
npm run build

# Start the production server
npm start
```

## How It Works

This project uses a combination of Vue 3, Vite, and Express to provide server-side rendering:

1. The Express server handles incoming requests
2. The server renders the Vue application to HTML
3. The HTML is sent to the client
4. The client-side Vue app takes over (hydration)
5. Subsequent navigation happens on the client

## Why Use This Setup?

- **Performance**: Server-side rendering improves initial page load time
- **SEO**: Search engines can crawl your content effectively
- **Development Experience**: Fast development with Vite's HMR
- **Type Safety**: Full TypeScript support
- **Modern Stack**: Uses the latest versions of Vue and Vite

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 