# Project Setup Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js
- PostgreSQL
- NestJS CLI

## Installing NestJS CLI

The NestJS CLI is a powerful tool that helps you initialize, develop, and maintain your NestJS applications. Install it globally using npm:

```bash
$ npm i -g @nestjs/cli
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <project-folder>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=
DB_NAME=
JWT_EXPIRES=
JWT_SECRET=
# Admin seeding
ADMIN_NAME=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

## Compile and Run the Project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

