# About The Project

A fullstack social blogging platform built with Spring Boot and Angular, designed to help students document and share their learning journey.

### Built With 

* ![Angular](https://img.shields.io/badge/-Angular-DD0031?style=for-the-badge&logo=angular&logoColor=fff)
* ![Bootstrap](https://img.shields.io/badge/-Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=fff)
* ![Spring Boot](https://img.shields.io/badge/-Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=fff)
* ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=fff)

### Features

* User registration and login using JWT and Spring Security for authentication and role management.
* Users can create posts, like posts, and comment on other users posts.
* Each user has a public profile listing all their posts
* Users can subscribe to other profiles
* Subscribed users receive notifications when new posts are published
* Users can report profiles or posts for inappropriate or offensive content
* The admin dashboard allow administrator to manage users, posts, and reports.
* Administrator can ban or delete users, hide or delete posts, and respond to reports by marking them as resolved or rejected.

# Installation & Setup

### Clone the repository 

```bash
    git clone https://github.com/yelasri07/01blog.git
    cd 01blog
```

Rename ".env.example" to ".env" in both the 01blog root directory and the backend root directory.

You should have two separate ".env" files:

* One located in the 01blog root
* One located in the backend root

After renaming them, fill in each ".env" file with the appropriate values based on the provided examples.

### Database Setup (PostgreSQL)

```bash
    docker compose up
```

### Back-End Setup (Spring boot)

```bash
    cd ./backend
    ./mvnw spring-boot:run
```

### Front-End Setup (Angular)

```bash
    cd frontend
    npm i
    npm start
```

### Or run all 

```bash
    chmod +x runner.sh
    ./runner.sh
```

# Contact

Youssef El Asri - elasriyoussef604@gmail.com

Project Link: [https://github.com/yelasri07/01blog](https://github.com/yelasri07/01blog)
