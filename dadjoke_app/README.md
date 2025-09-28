# Lesson: Building a Dockerized Web App with the Gemini Agent in VSCode

## Introduction

Welcome! This lesson will guide you through using the Gemini agent in VSCode to generate a complete, containerized web application from a single prompt. We will build a "Dad Joke" application with a React frontend, a Node.js backend, and a PostgreSQL database, all running in Docker containers.

## Setting Up Your Gemini Agent

Before we begin building our application, let's ensure your Gemini agent is set up for success in VSCode.

### 1. Getting Started with Gemini in VSCode

To use Gemini in Visual Studio Code, you first need to install the extension and sign in.

1.  **Install the Extension:** Open the **Extensions** view in VSCode (you can use the shortcut `Ctrl+Shift+X` or `Cmd+Shift+X`). In the search bar, type `Gemini` and look for the extension published by `Google`. Click the **Install** button.
2.  **Sign In:** After installation, you will need to sign in to your Google account. A prompt may appear automatically, or you can open the Gemini chat view from the activity bar on the left and click the "Sign In" button. You will need a personal Google account to use the Gemini agent.
3.  **Start Chatting:** Once you are signed in, you can start interacting with Gemini. For this lesson, we will be using the agent capabilities, which allow Gemini to perform actions on your behalf.  Note you may need to click "preview" in the chat bar to enable the agent capabilities.

### 2. Using the Agent Preview

The Gemini agent is a powerful assistant that can understand your project, make changes to your code, and use tools to help you build and debug applications. It goes beyond just generating code; it can interact with your file system and run commands.

### 3. Understanding the Agent's Tools

Your Gemini agent comes equipped with a powerful set of tools to help you with your software development tasks. Here’s a quick summary of what it can do:

*   **File System Operations:** The agent can read, write, and list files and directories. It can also search for content within files and find files matching specific patterns. This allows it to understand your project structure and make changes to your code.
*   **Code Manipulation:** The agent can intelligently replace blocks of text, which is perfect for refactoring code or fixing bugs.
*   **Shell Command Execution:** The agent can run shell commands, allowing it to do things like install dependencies (`npm install`), run tests (`npm test`), and, as we'll see in this lesson, manage Docker containers and Git repositories.
*   **Web Searching:** If the agent needs information from the internet, it can perform web searches to find answers to questions or look up documentation.

### 4. Adding Context to Your Agent

To help the Gemini agent understand your project better, you can add files and folders to its context. You can do this by right-clicking on a file or folder in the VSCode Explorer and selecting "Add to Gemini Context". This is a great way to focus the agent's attention on specific parts of your project when you're asking for help.

### 5. Useful Tips

*   **Be Specific with Your Prompts:** The more specific you are with your prompts, the better the agent will be able to help you. As you'll see in this lesson, providing clear instructions leads to better results.
*   **Iterate and Refine:** Don't be afraid to ask the agent to refine its answer or make changes to the code it has written. It's a collaborative process!
*   **Review the Plan:** For complex tasks, the agent will often propose a plan before it starts making changes. Reviewing this plan is a great way to ensure the agent is on the right track.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Visual Studio Code:** With the Gemini extension enabled and signed in.
*   **Docker Desktop:** To build and run the Docker containers.
*   **Git:** For version control.
*   **GitHub CLI (Optional):** For interacting with GitHub from the command line.

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

> **Your Prompt:** "Yes, that's perfect. Please use this as our working directory: `/Users/chadthompsonsmith/Desktop/code_platoon_do/do-delta-dev/dadjoke_app`"

## Step 3: Scaffolding the Project

Next, the agent will create the necessary directory structure for the project. You can ask the agent to do this for you.

> **Your Prompt:** "Great, please create the directory structure for our project."

The agent will then execute the necessary commands:

```bash
mkdir -p dadjoke_app/backend && mkdir -p dadjoke_app/database && mkdir -p dadjoke_app/frontend/public && mkdir -p dadjoke_app/frontend/src
```

## Step 4: Creating the Application Files

The agent will then generate all the necessary files for the application. You can prompt the agent to create all the files at once.

> **Your Prompt:** "Please create the files for our application. Start with the `docker-compose.yml` file, then the database, backend, and finally the frontend files."

This is a breakdown of the key files the agent will create.

## Step 5: The Bug and the Fix

After the initial build, we encountered a bug. The frontend was unable to connect to the backend, resulting in an `ECONNREFUSED` error. This is a common issue when working with Docker containers.

You can present the error to the agent to get help debugging.

> **Your Prompt:** "I'm having an issue with the app. I ran `docker-compose down` and then `docker-compose up` to see the logs. The app is running, but when I click the button to get a joke, nothing happens. Here are the logs: [paste logs here]"

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
docker-compose down
```

## Step 8: Version Control with Git

Now that you have a working application, it's time to save your work using Git.

### 1. Create a Remote Repository

It's a best practice to store your code in a remote repository. Here are examples for GitHub and AWS CodeCommit.

#### GitHub

If you have the [GitHub CLI](https://cli.github.com/) installed, you can follow these steps.

**1. Create a new repository on GitHub:**

Run this command to create a new public repository. This will also output the URL for your new repository.

```bash
gh repo create dadjoke_app --public
```

**2. Initialize the local Git repository and push your code:**

Navigate to your project's root directory (`dadjoke_app`) and run the following commands:

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

#### AWS CodeCommit

If you are using AWS, you can create a CodeCommit repository with the AWS CLI:

```bash
aws codecommit create-repository --repository-name dadjoke-app --repository-description "Dad Joke application"
```

After running this command, AWS will return a JSON object containing the repository's metadata, including the `cloneUrlHttp` or `cloneUrlSsh`. You will use one of these URLs to connect your local repository to this remote one.

### 2. Prompting Gemini for Git Commands

You can also ask the Gemini agent to run all the necessary Git commands for you in a single, efficient prompt. This is a great way to speed up your workflow.

> **Your Prompt:** "Please initialize a Git repository, add the remote origin `[paste your clone URL here]`, stage all the files, create a commit with the message 'feat: Create initial Dockerized Dad Joke application', and then push the changes to the main branch."

**A Note on Security:** The Gemini agent can run `git push`, but it relies on your local environment being authenticated with your Git provider. The agent does not have access to your passwords or tokens.

## Conclusion

In this lesson, you learned how to use the Gemini agent in VSCode to generate a complete, containerized web application from a single prompt. We saw how the agent can create a plan, scaffold a project, generate code, and even help debug issues. This powerful tool can significantly accelerate your development workflow and help you learn new technologies.

Now it's your turn to experiment! Try modifying the application, adding new features, or even starting a new project from scratch with the Gemini agent.
