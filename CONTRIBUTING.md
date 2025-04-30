## Setup

1. Clone the repository
2. Run `yarn`

## Usage

### Validate correctness

```sh
yarn validate
```

### Format code

```sh
yarn fix
```

### Try components interactively

```sh
yarn storybook
```

## Commit Messages

We use [semantic-release](https://github.com/semantic-release/semantic-release) to automatically generate
- version number
- changelog
- releases

This requires to write commit messages that follow the [Angular commit message format](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-format),
except that we do not use `scope` and `body` is always optional.

Merge requests with a lot of intermediary commits must be cleaned up by force pushing rewritten commits.

## Pre-releases

When you want to test out your changes in a project before merging,
you can push them to a branch `alpha` or `beta` to trigger a pre-release.
See [publishing pre-releases](https://semantic-release.gitbook.io/semantic-release/recipes/release-workflow/pre-releases). 
