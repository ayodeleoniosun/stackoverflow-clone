# Stackoverflow clone API

## Description

This repository implements a simple clone of Stackoverflow using Node.js (Typescript), Express and Sequelize.
As stated in the assessment test, the following modules were implemented:

1. Authentication
2. Questions (asking and replying)
3. Rating (upvoting/downvoting)

## Table of Content

- [Assumptions Made](#assumptions-made)
- [System Setup](#system-setup)
- [Installation](#installation)
- [Documentation](#documentation)
- [Deployment](#deployment)
- [Requirements not covered](#requirements-not-covered)
- [Feedbacks](#feedbacks)

## Assumptions Made

The following assumptions were made during the process of implementing this task:

1. Valid email address is supplied by the user during the registration process, as I did not verify that.
2. You don't need to be logged before you can view all posted questions and their respective replies and ratings.

These are the database relationships:

1. A user can post many questions.
2. A question can have many replies.
3. A user can comment on many questions.
4. A reply can have many ratings.
5. A user can rate many replies.

The entity relationship diagram is available [here](https://dbdiagram.io/d/608b8657b29a09603d12c9c5).

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
- Change `root` to your database username and `password` to your database password in DATABASE_URL variable
- Update other DB\_ variables to your local database configuration details
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

## Documentation

After starting the project in development mode, the API documentation is available [here](https://localhost:4000/api/docs/).

## Deployment

1. Clone the repo - `git clone <repo-url>`
2. Navigate into the project directory - `cd <project-directory>`
3. Ensure you have Node.js installed
4. Install dependencies - `npm install`
5. Set up environment variables
   - Copy .env.sample to env - `cp .env.sample .env`
   - Create new mysql database.
   - Change `root` to your database username and `password` to your database password in DATABASE_URL variable
   - Update other DB\_ variables to your local database configuration details
   - Update other variables as needed
6. Run database migrations - `npm run prestart`
7. Create a production build - `npm run build`
8. Start the server - `npm run start`

## Requirements not covered

1. I could not write the tests for the task.
2. Other users could not subscribe to the question except the person that posted it.
3. Only replies can be up voted or down voted.

## Feedbacks

1. The task was well explanatory in terms of its requirements, technologies and tools to use.
