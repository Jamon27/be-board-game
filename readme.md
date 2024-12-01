# Chess Backend API

## Overview

This project is a backend service for a chess application. It is built with **Express.js** and **TypeScript** to ensure robust and scalable code, and it uses **Jest** for unit testing. The app is running on port :3100

The solution is built based on the possibility to return back to the initial position.
So from c4 to d6 we within 3 steps using the following logic:
c4 -> a5 -> c4 -> d6

Of course, it's not the shortest solution. But I believe it's can be a valid solution.

---

## Features

- RESTful API for chess management
- Written in TypeScript for type safety
- Unit testing with Jest
- Easy to set up and run locally

---

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v20)
- [npm](https://www.npmjs.com/)

---

## Installation

1. Install dependencies:

   ```bash
   npm install
   ```

---

## Running

1. To start the backend server:

   ```bash
   npm run start
   ```

   By default it's running on port 3100. But you can change it by setting process.env.BE_PORT to anything you want.

2. To run the test suite:

   ```bash
   npm run test
   ```
