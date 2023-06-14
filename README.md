# How to Run a Node/Express App

This guide will walk you through the steps to run a Express app.
## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org) (version 12 or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) package manager

## Step 1: Clone the App

1. Open your command line interface (CLI).
2. Clone the app using the following command:
    ```cmd
    git clone https://github.com/hammadkh0/todo-test-backend.git
    ```
3. Install packages using npm or yarn.
    - Using `npm`

     Open your command line interface (CLI) and navigate to your project directory. Then run the following command:

     ```cmd
     npm install
     ```

     This command will download and install all the packages defined in the `package.json` file into a `node_modules` directory.

   - Using `yarn`

    Open your command line interface (CLI) and navigate to your project directory. Then run the following command:

    ```cmd
    yarn install
    ```
4. Add the `environment variables` accordingly
    - DATABASE_URL
    - JWT_SECRET
    - JWT_EXPIRES_IN
5. Run the project using `npm run dev` command