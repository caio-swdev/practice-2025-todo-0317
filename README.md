# Next.js Todo App

[![CI](https://github.com/caio-swdev/practice-2025-todo-0317/actions/workflows/ci.yml/badge.svg)](https://github.com/caio-swdev/practice-2025-todo-0317/actions/workflows/ci.yml)

A modern Todo application built with Next.js and a comprehensive tech stack.

## Tech Stack

- **Next.js**: React framework for production
- **TypeScript**: For type safety
- **shadcn/ui**: High-quality UI components built on Radix UI
- **Lucide Icons**: Beautiful open-source icons
- **Jest & Testing Library**: For unit and component testing
- **Storybook**: For component documentation and development
- **Cypress**: For end-to-end testing
- **Tailwind CSS**: For styling

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

### Running Jest Tests

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

### Running Cypress Tests

```bash
npm run cypress
```

To run Cypress tests in headless mode:

```bash
npm run cypress:headless
```

To run tests against the development server:

```bash
npm run e2e
```

## Storybook

To explore and develop components in isolation:

```bash
npm run storybook
```

## Building for Production

```bash
npm run build
```

## Project Structure

- `src/app`: Pages and layout
- `src/components`: React components
- `src/components/ui`: shadcn/ui components
- `src/components/__tests__`: Component tests
- `cypress`: Cypress tests
- `.storybook`: Storybook configuration

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
