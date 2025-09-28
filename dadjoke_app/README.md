# Lesson: Building a Dockerized Web App with the Gemini Agent in VSCode

## Introduction

Welcome! This lesson will guide you through using the Gemini agent in VSCode to generate a complete, containerized web application from a single prompt. We will build a "Dad Joke" application with a React frontend, a Node.js backend, and a PostgreSQL database, all running in Docker containers.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Visual Studio Code:** With the Gemini extension enabled.
*   **Docker Desktop:** To build and run the Docker containers.
*   **Git:** For version control.
*   **GitHub CLI :** For interacting with GitHub from the command line.

## Overview

## Step 1: The Initial Prompt

We'll start with a specific prompt to the Gemini agent to ensure we get the exact application we want. This is the first step to bring our application to life.

> **Your Prompt:** "I want to create a fun, containerized web application. Please build a 'Dad Joke' app with a React frontend, a Node.js backend, and a PostgreSQL database. The entire application should be managed with Docker."

This clear and specific prompt tells the agent exactly what to build.

## Step 2: The Plan

The Gemini agent will confirm the plan based on your specific request.

> **Gemini's Plan:**
> "Great idea! I will build the 'Dad Joke' application for you. Here is the plan:
> *   **Frontend:** A React app to display the jokes.
> *   **Backend:** A Node.js/Express API to serve the jokes from the database.
> *   **Database:** A PostgreSQL database to store the dad jokes.
>
> The whole application will be containerized with Docker, so you can run it easily with a single command."

After you approve the plan, the agent will begin building the application.

> **Your Prompt:** "Yes, that's perfect. Please use this as our working directory: `enter a path to your working directory here/dadjoke_app`"

## Step 3: Scaffolding the Project

Next, the agent will create the necessary directory structure for the project. You can ask the agent to do this for you directly if it doesnt trigger on the previous prompt.

> **Your Prompt:** "Great, please create the directory structure for our project."

The agent will then execute the necessary commands:

```bash
mkdir -p dadjoke_app/backend && mkdir -p dadjoke_app/database && mkdir -p dadjoke_app/frontend/public && mkdir -p dadjoke_app/frontend/src
```

## Step 4: Creating the Application Files

The agent will then generate all the necessary files for the application. You can prompt the agent to create all the files at once and then run the application.

> **Your Prompt:** "Please create the files for our application. Start with the `docker-compose.yml` file, then the database, backend, and finally the frontend files.  When completed please spin up the containers via the docker-compose file.  Run in attached mode so I can see the logs."

This is a breakdown of the key files the agent will create.

## Step 5: The Bug and the Fix

After the initial build, I encountered a bug. The frontend was unable to connect to the backend, resulting in an `ECONNREFUSED` error. This is a common issue when working with Docker containers.

You can present the error to the agent to get help debugging.  You may or may not run into this issue, but it's a good example of how to use the agent for debugging.  

Dont get discouraged if you do run into issues.  Remmeber coding with AI Agent's is a learning experience, and debugging is part of that process, its hughly itterative process learning how agents work well and dont work well.

> **Your Prompt:** "I'm having an issue with the app. The app is running, but when I click the button to get a joke, nothing happens. Here are the logs: [paste logs here from the terminal]. Can you help me debug this?"

The agent will identify the problem: the frontend container was trying to connect to `localhost:3001`, which refers to itself inside the container, not the backend container.

The fix was to update the `axios` request URL in `frontend/src/App.js` to use the correct address for the backend:

```javascript
// Before
const res = await axios.get('/api/joke');

// After
const res = await axios.get('http://localhost:3001/api/joke');
```

## Step 6: Launching the Application

With the fix in place, we can rebuild and start the application. You can ask the agent to do this for you.

> **Your Prompt:** "Now that the files are created, please build and start the application."

The agent will then run the command:

```bash
docker-compose up --build
```

## Step 7: Accessing and Stopping the Application

Once the containers are running, you can access the Dad Joke application in your web browser at:

[http://localhost:3000](http://localhost:3000)

To stop the application, press `Ctrl + C` in the terminal where `docker-compose` is running, or run the following command from the `dadjoke_app` directory:

```bash
docker-compose down --remove-orphans
```

## Step 8: Version Control with Git

Now that you have a working application, it's time to save your work using Git.

### 1. Create a Remote Repository

It's a best practice to store your code in a remote repository. Here are examples for GitHub.

#### GitHub

If you have the [GitHub CLI](https://cli.github.com/) installed, you can follow these steps.

**1. Create a new repository on GitHub:**

Run this command to create a new public repository. This will also output the URL for your new repository.

```bash
gh repo create dadjoke_app --public
```

**2. Initialize the local Git repository and push your code:**

Navigate to your project's root directory (`dadjoke_app`) and run the following commands (or better yet, ask the Gemini agent to run them for you using the prompt below #2)

```bash
# Initialize the local repository
git init -b main

# Add the remote repository using the URL from the 'gh repo create' command
git remote add origin [PASTE_THE_REPO_URL_HERE]

# Add all files to staging
git add .

# Create your first commit
git commit -m "feat: Create initial Dockerized Dad Joke application"

# Push your code to GitHub
git push -u origin main
```

### 2. Prompting Gemini for Git Commands

You can also ask the Gemini agent to run all the necessary Git commands for you in a single, efficient prompt. This is a great way to speed up your workflow.

> **Your Prompt:** "Please initialize a Git repository, add the remote origin `[paste your clone URL here]`, stage all the files, create a robust commit message detailing all the changes, and then push the changes to the main branch."

**A Note on Security:** The Gemini agent can run `git push`, but it relies on your local environment being authenticated with your Git provider. The agent does not have access to your passwords or tokens.

## Conclusion

In this lesson, you learned how to use the Gemini agent in VSCode to generate a complete, containerized web application from a single prompt. We saw how the agent can create a plan, scaffold a project, generate code, and even help debug issues. This powerful tool can significantly accelerate your development workflow and help you learn new technologies.

Now it's your turn to experiment! Try modifying the application, adding new features, or even starting a new project from scratch with the Gemini agent.
