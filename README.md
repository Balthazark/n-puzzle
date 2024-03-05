# 🚀 Continuous Documentation for Grebban N-Puzzle Code Test

## Deployed site

[N-puzzle](https://karl-n-puzzle.netlify.app)

## Introduction

This document outlines my development choices, assumptions, and the given requirements for the Grebban N-Puzzle code test. This document will be committed to version control and updated as I iterate on the code test.

## Development Choices

### Framework and Libraries

- **Gatsby**: As the official React documentation now recommends using a Meta framework for building React applications, I choose to use Gatsby for the development of this code test [Reference to React docs](https://react.dev/learn/start-a-new-react-project). While Next.js and Vite was considered as well, I settled with Gatsby as the code test does not depend on any external data, thus no need to leverage the full stack capabilities of Next.js. Choosing Gatsby is also awesome opportunity to learn a technology used at Grebban! ⭐ Furthermore, Gatsby enables building the application using static site generation which enables caching on a CDN for faster load times.
- **Styled-Components**: Utilized for component-level styling to encapsulate styles within components, promoting a clean and maintainable codebase as well as learning a new technology that is also utilized at Grebban!
- **Jest**: Selected for testing the business logic of the code test, which in this case is the puzzle logic. Jest will also be used as the test runner for the UI tests.
- **React Testing Library**: Selected for testing the React components, ensuring that the UI works as expected.
- **Font**: The Open Sans font will be self hosted in the project, due to the performance gain explained in the Gatbsy docs [Reference to Gatsby Docs](https://www.gatsbyjs.com/docs/how-to/styling/using-web-fonts/).

## Development Practices

A test driven development process will be utilized, where failing test are first implemented and then the actual code to satisfy the tests.

## Tooling

The tooling listed belows uses the default configurations.

### TypeScript Integration

TypeScript has been chosen to help catch errors early in the development process.

### Linting with TypeScript-ESLint

To further ensure code quality and consistency, I added TypeScript-ESLint.

### Code Formatting with Prettier.

To ensure consistent formatting across the codebase, Prettier was also added.

### CI/CD Pipeline

A small CI/CD pipeline was added to enforce code quality.

**CI Pipeline**:

- **GitHub Actions** is used to trigger workflows on pull requests to the main branch. These workflows include:
  - Running **tsc -- no emit\*** for a type check without outputting code.
  - Running **Prettier** to check code formatting.
  - Executing **ESLint** for linting.
  - Running unit and integration tests to ensure code reliability.
  - Building the code with Gatsby.

**CD Pipeline**:

- Upon merging a pull request to the main branch, the latest version is deployed to **Netlify**.

### Project Structure

Outlined is a an initial structure focusing on simplicity and scalability:

- `src/components`: Contains all React UI components, with logic and styles collocated for ease of development.
- `src/utils`: Houses pure utility functions like the shuffle algorithm and move tiles function, which enables ease of unit testing isolated from React component lifecycles or state updates.
- `src/hooks`: Custom React hooks for managing stateful logic, such as the game state.

Spec files will be collocated with the file for the respective functionality that they test for ease of navigation in the code base.

### Responsive Design

- A mobile-first approach is intended to be used, ensuring the application is accessible and user-friendly on mobile devices, using modern CSS such as flex box, clamp, calc and media queries for adjusting layout and typography if needed.

## Assumptions

- Reading up on the original 15 puzzle, I discovered that if tiles are a randomized, the game might end up in state that is not solvable, about half the time.
  [Wikipedia reference](https://en.wikipedia.org/wiki/15_Puzzle) Thus I assume it to be a requirement that the puzzle is actually solvable. The approach for checking solvability from the wiki page was used when implementing the isSolveAble function.
- As the empty tiles "goal" position is in the lower right corner, I assume we can model it as having a value of 16 for ease of checking the puzzle is solved etc.

## Requirements

- [ ] The page must be responsive and work on mobile, tablet, etc.
- [ ] The tiles must be numbered from 1 upwards, with exactly one empty space.
- [ ] Tiles are moved by clicking on a tile in the same column or row as the empty square.
- [ ] Implement a shuffle function to randomize the tiles, ensuring the puzzle remains solvable.
- [ ] Utilize the Google font Open Sans for all text.
- [ ] Display a message or indication when the user solves the puzzle.
- [ ] Include unit and component tests to validate the game's business logic and UI components.

## Extras

- While UI for dynamic configuration by the user is not required, it would be nice to have! Would enable ease of visual testing for responsive design as well.

## Time spent

- Planning and writing first draft for documentation: ~1h
- Init and config project: ~1h
- Set up CI/CD pipeline: ~30m
- Writing test and implementing first version of models and logic: ~4h
- Reworking models and logic, adding additional tests: ~4h
