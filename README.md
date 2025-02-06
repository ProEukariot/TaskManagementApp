# React + TypeScript Task Management App

A simple task management application built with React and TypeScript. This app allows users to create, manage, and track tasks efficiently.

## Requirements

To run this project, you need the following installed on your machine:

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

## How to Run the App

Follow these steps to set up and run the application locally:

 - git clone https://github.com/ProEukariot/TaskManagementApp.git
 - cd TaskManagementApp
 - docker build -t task-management-app ./
 - docker run -p 80:80 task-management-app
 
Now the app can be accessed at http://localhost:80

## Notes

If you need to change the port, adjust the -p option in the docker run command. For example, -p 8080:80 would run the app on port 8080 locally.