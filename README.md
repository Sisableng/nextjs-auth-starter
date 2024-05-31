# Next.js Starter Kit
![image1](https://github.com/Sisableng/nextjs-auth-starter/assets/58748827/a1cc1ea2-f793-44a7-b31a-ef279d8b4c09)


## Introduction

This starter kit is a Next.js project integrated with Auth.js v5 for authentication. It provides a basic setup for user authentication, profile updates, password management, and more.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Features](#features)
- [Dependencies](#dependencies)
- [Usage](#usage)
- [Configuration](#configuration)
- [Documentation](#documentation)
- [Author](#author)

## Installation

To install and set up this project, follow these steps:

1. **Install Bun:**
   Make sure you have Bun installed on your machine. You can install it from the official website: [Bun.sh](https://bun.sh/).

2. **Use Template:**
   Click on the button _Use this template_ then click _Create new repository_, then clone the repo to your machine.

3. **Install Dependencies:**
   ```bash
   $ bun install
   ```

## Usage

To run the project, use the following command:

```bash
bun dev
```

## Configuration

To configure the project:

1. Set up your PostgreSQL database.
2. Rename `.env.example` to `.env` and place your database URL in the `.env` file.

```env
DATABASE_URL=your_postgresql_database_url
```

3. Open terminal and run this command

```bash
bunx auth secret
```

and then place the value to .env by following

```env
NEXT_PUBLIC_AUTH_SECRET=value_from_terminal
```

## Features

- User authentication with Auth.js v5
- Update user profile
- Password management

## Dependencies

This project uses the following dependencies:

- [Shadcn](https://github.com/shadcn)
- [Tailwind CSS](https://tailwindcss.com/)
- [Auth.js](https://authjs.dev/)
- [Drizzle ORM](https://github.com/drizzle-team/drizzle-orm)

## Documentation

For further details on usage and configuration, refer to the following documentation links:

- [Next.js Documentation](https://nextjs.org/docs)
- [Auth.js Documentation](https://authjs.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://github.com/drizzle-team/drizzle-orm#readme)

## Author

- [@Sisableng](https://github.com/Sisableng)
