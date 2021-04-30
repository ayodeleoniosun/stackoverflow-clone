# Stackoverflow clone API

## Description

The task implemented a simple clone of Stackoverflow using Node.js (Typescript), Express and Sequelize.
To limit scope, there are 3 modules that were implemented:

1. Authentication
2. Questions (asking and replying)
3. Rating (upvoting/downvoting)

## Table of Content

- [Assumptions Made](#assumptions-made)
- [Documentation](#documentation)
- [System Setup](#system-setup)
- [Installation](#installation)
- [Testing](#testing)
- [Deployment](#deployment)
- [Feedbacks](#feedbacks)

## Assumptions Made

The following assumptions were made during the process of implementing this task:

1. Valid email address is supplied by the user during the registration process, as I did not verify that.
2. Questions are automatically subscribed to.
3. You don't need to be logged before you can view all posted questions and their respective replies and ratings.

These are the database relationships:

1. A user can post many questions but a question can only belong to a user.
2. A question can have many replies but a reply can only belong to a question.
3. A user can comments on many questions.
4. A reply can have many ratings but a rating can only belong to a reply.
5. A user can rate many replies.

The Dbdiagram is available [here](https://dbdiagram.io/d/608b8657b29a09603d12c9c5).

## Documentation

The API documentation is available [here](https://localhost:4000/api/docs/).

### System Setup

Your system will need to have the following software installed:

- [Node](https://nodejs.org/en/download/)
- [Typescript](https://www.typescriptlang.org/download/)

## Installation

#### Step 1: Clone the repository

```bash
git clone <repo-url>
cd <project-directory>
```

#### Step 2: Setup database

Create a new mysql database

#### Step 3: Setup environment variables

- Copy `.env.sample` to `.env` i.e `cp .env.sample .env`
- Change `root` to your database username and `password` to your database password in DATABASE\*URL variable
- Update other DB\* variables to your local database configuration details
- Update other variables as needed

#### Step 4: Install NPM packages

```bash
npm i
```

#### Step 5: Make database migration

```bash
npm run prestart
```

#### Step 6: Start in development mode

```bash
npm run dev
```

## Testing

```bash
npm run test
```

## Deployment

1. Clone the repo - `git clone <repo-url>`
2. Navigate into the project directory - `cd <project-directory>`
3. Ensure you have NodeJS (at least v12) installed
4. Install dependencies - `npm install`
5. Set up environment variables
   - Copy .env.sample to env - `cp .env.sample .env`
   - Create new mysql databasE.
   - Change `root` to your database username and `password` to your database password in DATABASE\*URL variable
   - Update other DB\* variables to your local database configuration details
   - Update other variables as needed
6. Run database migrations - `npm run pre:start`
7. Seed initial data - `npx sequelize-cli db:seed:all`
8. Create a production build - `npm run build`
9. Start the server - `npm run start`

## Feedbacks

1. Sample error messages need to be supplied to avoid any form of typo.
2. Sample content of the mail to be sent to the user who created the post when replies are made should be supplied.
