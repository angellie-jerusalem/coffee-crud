# BrewBase — Coffee Shop Menu CRUD API

A PHP REST API with a connected frontend for managing a coffee shop menu.

## Tech Stack

* **Backend:** PHP (Vanilla PHP), PDO
* **Database:** MySQL (XAMPP)
* **Frontend:** HTML, CSS, JavaScript

## Project Structure

```bash
coffee-crud/
├── api/
│   ├── config/
│   │   └── db.php
│   ├── models/
│   │   └── MenuItem.php
│   └── menu/
│       ├── read.php
│       ├── create.php
│       ├── update.php
│       └── delete.php
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
└── README.md
```

## Database Schema

```sql
CREATE DATABASE IF NOT EXISTS coffee_shop;
USE coffee_shop;

CREATE TABLE IF NOT EXISTS menu_items (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)    NOT NULL,
    category    VARCHAR(50)     NOT NULL,
    price       DECIMAL(10, 2)  NOT NULL,
    description TEXT,
    available   TINYINT(1)      DEFAULT 1,
    created_at  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | `/api/menu/read.php`   | Fetch all menu items |
| POST   | `/api/menu/create.php` | Add a new menu item  |
| PUT    | `/api/menu/update.php` | Update a menu item   |
| DELETE | `/api/menu/delete.php` | Delete a menu item   |

## Features

* Full CRUD Operations
* Category Filter Tabs
* Available / Unavailable Toggle
* Responsive UI Design
* Toast Notifications

## Preview Link

```bash
http://localhost/coffee-crud/frontend/index.html
```
