# Automated-Commit

Automated-Commit is a simple and reusable example of a GitHub Actions workflow that periodically updates a `QUOTES.md` file with programming quotes of the day and their timestamps, then performs an automatic commit when it detects changes.

## Description

This repository demonstrates how to automate routine tasks in a repository using GitHub Actions. The main workflow:

- Clones the content from the `main` branch.
- Fetches a random programming quote from the [Programming Quotes API](https://programming-quotesapi.vercel.app/api/random).
- Appends a new row to `QUOTES.md` with the timestamp, author, and quote in a markdown table format.
- Updates `TIMESTAMP.txt` for backwards compatibility.
- Performs a commit if files changed.
- Pushes the commit back to the `main` branch.

The goal is to serve as a template for automatic maintenance tasks (for example, periodic updates, status files, or similar scheduled tasks).

## Features

- Fetches a random programming quote from an external API on each run.
- Builds and maintains a markdown table (`QUOTES.md`) with timestamp, author, and quote.
- Automatically executable on schedule (multiple times daily by default).
- Allows manual execution from the Actions tab (`workflow_dispatch`).
- Minimal configuration: Git name and email configured in the workflow.
- Creates a growing history of quotes over time.

## Workflow Structure

The workflow is defined in `.github/workflows/master.yml` and includes:

- Triggers: `schedule` (cron every 12 hours) and `workflow_dispatch` for manual execution.
- Main job: `update_commit` that runs on `ubuntu-latest`.
- Steps: checkout, configure Git, update `TIMESTAMP.txt`, commit, and push.
- Permissions: the workflow needs write permissions (default GITHUB_TOKEN usually suffices).

## Requirements

- A repository on GitHub.
- GitHub Actions enabled in the repository.

## Installation and Usage

1. Use this repository as a template (click the "Use this template" button) or clone it locally.
2. Open `.github/workflows/master.yml` and customize the configuration values (see "Configuration" section below).
3. Push the changes to `master` to activate the workflow.

### Manual Execution

1. Go to the `Actions` tab in your repository.
2. Select the `Automated-Commit` workflow.
3. Click "Run workflow" and confirm the branch.

## Configuration

Edit `.github/workflows/master.yml` as needed:

- Configure the `GIT_USER_EMAIL` and `GIT_USER_NAME` variables in Settings > Secrets and variables > Variables (optional; if not set, the default GitHub Actions account will be used).
- Change the cron frequency if you need a different interval.
- Quote API endpoint: currently uses `https://programming-quotesapi.vercel.app/api/random` — can be swapped for another JSON API with `author` and `quote` fields.


## Common Customizations

- Modify the cron: change the expression in `schedule` within the yml file.
- Swap the API endpoint: replace the quote API URL with a different one (ensure the response has `author` and `quote` JSON fields).
- Change quote formatting: adjust the markdown table columns or format in the "Fetch Quote and Update Table" step.
- Add validation: insert additional steps before the commit to validate the API response or quote quality.

## Contributing

Contributions are welcome:

1. Open an issue to discuss major changes.
2. Send Pull Requests with clear descriptions.

