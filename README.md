# GitHub Profile Finder

A responsive web application that searches GitHub users using the GitHub REST API and displays their profile information, statistics, and top repositories.

## Task

Internship Task 15 - GitHub Profile Finder

## Features

- Search GitHub users by username
- Display GitHub avatar
- Display name and username
- Display profile bio
- Display followers and following
- Display public repository count
- Display public gist count
- Display location and company
- Display personal website
- Display account creation date
- Display top repositories
- Repository stars, forks and programming language
- Loading state
- Error handling
- Invalid username handling
- Responsive design

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Fetch API
- GitHub REST API

## API

GitHub REST API:

https://api.github.com/users

Profile endpoint:

`GET /users/{username}`

Repositories endpoint:

`GET /users/{username}/repos`

## How to Run

1) Clone the repository:

```bash
git clone https://github.com/Abhinav1574k/github-profile-finder.git
```

2) Open the project directory:

cd github-profile-finder

3) Open:

http://localhost:5500


## Usage
1) Enter a GitHub username.
2) Click Search.
3) The application fetches the user's profile.
4) The profile statistics and repositories are displayed.
5) Invalid usernames display an appropriate error message.


## Error Handling
The application handles:

1) Empty username
2) Nonexistent GitHub users
3) GitHub API rate limits
4) API request failures
5) Users without public repositories
6) Missing profile information


## Deployment
The project is a frontend-only application and can be deployed using GitHub Pages, Netlify, or Vercel.

## Project Structure
github-profile-finder/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── .gitignore

## Learning Outcomes
This project demonstrates:

1) REST API consumption
2) Fetch API
3) async/await
4) Promise-based requests
5) Dynamic DOM rendering
6) Error handling
7) Loading states
8) Responsive UI design
9) Working with nested API data

## Author
Abhinav Upadhyay
Web Development