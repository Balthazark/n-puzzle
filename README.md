# 🚀 Continuous Documentation for Grebban N-Puzzle Code Test

## Deployed site

[N-puzzle](https://karl-n-puzzle.netlify.app)

## Introduction

This document outlines my development choices, assumptions, and the given requirements for the Grebban N-Puzzle code test. This document will be committed to version control and updated as I iterate on the code test.

### Running the Project

The project can be run locally in development mode with the following commands:

```bash
npm run start
```

or

```bash
gatsby develop
```

Or in produciton mode with:

```bash
gatsby build
gatsby serve
```

I used the latest at the time LTS version of node: '21.6.1'. If there are any difficulties with the running the project I could gladly provide a Docker image as well!

## Personal goals ⭐

- To showcase as much of my skill set as possible within the scope of the code test.
- To take the chance to learn some new technologies.
- Have a lot of fun!

## Development Choices

- To employ test driven development, to have confidence in the behavior of the code.
- Aim to write pure functions, minimizing side effects.
- Aim for modularity within the code base through high cohesion and low coupling.

## Technical solutions I am satisfied with

- I am really happy about the test coverage in the code base.
- I am also satisfied with how the dependencies within the project are set up. The types acts as the models, the util functions encapsulate the business logic of the game, the custom hook provides a clear interface for the UI to hook into the business logic so that the the react components do not have to depend on implementation details and just rerenders when new data is provided as props.
- The CI pipeline was really helpful for enforcing code quality before every PR merge.
- Im am satisfied with the structure of the code base where tests are co-located with either their functions or components. For now I co-located the styles within the components, as I myself prefer to have easy access to styles scoped to components. But the styles could also be moved to designated style files if preferred very easily. Styles were also placed at the bottom due to JavaScripts function hoisting capabilities, which provides easy access to React part of the components.
- Im also happy about focusing on accessability, something very new for me but something I really want to learn more about!

## Difficulties and opportunities for improvement

- Some edge cases I noted at the end of development are that the util function for getting a new board could end up generating either the same board or a solved board. Due to the statistical low risk of this happening, I decided to leave this as is as I would either have to turn to recursion or reassignment and a while loop to solve this, thus introducing more complexity.
- Doing responsive design in combination with the requirement of dynamic values for the amount of columns and rows proved to very tricky! I settled for handling this with view port units in combination with the calc, clamp and min css function , which feels like it might not be the optimal approach. But it was the best solution I could produce for now. Would love to talk and learn more about this!
- Some of the util functions could definitely be optimized in time complexity, but due to the grid not being very large I settled with current implementations for now.
- During the lighthouse audit, I saw some potential for improvement in CLS, that I would also love to discuss on how to improve upon! The site also gets flagged for missing a meta description for SEO. From what I can see I have configured the project to provide this, and thus I would happily hear more about on how to tackle this.

### Framework and Libraries

- **Gatsby**: As the official React documentation now recommends using a Meta framework for building React applications, I choose to use Gatsby for the development of this code test [Reference to React docs](https://react.dev/learn/start-a-new-react-project). While Next.js and Vite was considered as well, I settled with Gatsby as the code test does not depend on any external data, thus no need to leverage the full stack capabilities of Next.js. Choosing Gatsby is also awesome opportunity to learn a technology used at Grebban! Furthermore, Gatsby enables building the application using static site generation which enables caching on a CDN for faster load times.
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

- `src/types`: Contains the types that were used for modeling the n-puzzle game.
- `src/utils`: Houses utility functions for the business logic of the application. For instance, the shuffle algorithm and move tiles function, which enables ease of unit testing isolated from the React component lifecycle or state updates.
- `src/components`: Contains all React UI components, with test and styles collocated for ease of development.
- `src/pages`: The actual pages of the web application. Contains the main page and the generated and modified 404 page from the Gatsby init.
- `src/hooks`: Folder for containing hooks, in this case, the useBoard hook that hooks into functionality provided by the util functions.
- `src/styles`: Contains themes, in this case, only the light theme for now and some global styles like setting the font to Open Sans.

Spec files will be collocated with the file for the respective functionality that they test for ease of navigation in the code base.

### Responsive Design

- A mobile-first approach is intended to be used, ensuring the application is accessible and user-friendly on mobile devices, using modern CSS such as flex box, clamp, calc and media queries for adjusting layout and typography if needed. Relational units were also used to accommodate users changing their font settings in their browsers.

## Assumptions

- Reading up on the original 15 puzzle, I discovered that if tiles are a randomized, the game might end up in state that is not solvable, about half the time.
  [Wikipedia reference](https://en.wikipedia.org/wiki/15_Puzzle) Thus I assume it to be a requirement that the puzzle is actually solvable. The approach for checking solvability from the wiki page was used when implementing the isSolveAble function.
- As the empty tiles "goal" position is in the lower right corner, I assume we can model it as having a value of 16 for ease of checking the puzzle is solved etc.

## Requirements

- [x] The page must be responsive and work on mobile, tablet, etc.
- [x] The tiles must be numbered from 1 upwards, with exactly one empty space.
- [x] Tiles are moved by clicking on a tile in the same column or row as the empty square and multiple tiles can be moved.
- [x] Implement a shuffle function to randomize the tiles, ensuring the puzzle remains solvable.
- [x] Puzzle tiles should be shuffled when starting the game.
- [x] Utilize the Google font Open Sans for all text.
- [x] Display a message or indication when the user solves the puzzle.

## Idea for further development

- [ ] While UI for dynamic configuration by the user is not required, it would be nice to have! Would enable ease of visual testing for responsive design as well.
- [ ] Would be awesome to add some animations for the tiles.
- [ ] I also implemented a function for getting all the tiles that would move in a multi tile move. Would be cool to highlight these tiles in the UI.

## Time spent

Down below is a rough time estimate of time spent for the code test. I took my time when I had time off, had a lot of fun and learned a lot!

- Planning and writing first draft for documentation: ~1h
- Init and config project: ~1h
- Set up CI/CD pipeline: ~30m
- Writing test and implementing first version of models and logic: ~4h
- Reworking models and logic, adding additional tests: ~4h
- Writing tests, implementing React components, the main hook and responsive styling: ~4h
- Reworking the project to avoid hydration errors after deploy due to initial randomness of the game state: ~2h
- Some final clean up, lighthouse audit and finish writing documentation: ~2h
