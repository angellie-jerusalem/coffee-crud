# BrewBase — Coffee Shop Menu CRUD API

A PHP REST API with a connected frontend for managing a coffee shop menu.

## Tech Stack
- **Backend:** PHP (vanilla), PDO
- **Database:** MySQL (via XAMPP)
- **Frontend:** HTML, CSS, JavaScript

## Project Structure
```
coffee-crud/
├── api/
│ ├── config/
│ │ └── db.php               # Database connection
│ ├── models/
│ │ └── MenuItem.php         # Menu item model
│ └── menu/
│ ├── read.php               # GET - Fetch all items
│ ├── create.php             # POST - Add new item
│ ├── update.php             # PUT - Update item
│ └── delete.php             # DELETE - Remove item
├── frontend/
│ ├── index.html             # Main UI page
│ ├── style.css              # Styling and layout
│ └── app.js                 # Frontend logic & API calls
└── README.md

```

## Setup Instructions

### 1. Requirements
- XAMPP (Apache + MySQL)

### 2. Database Setup
1. Open **phpMyAdmin** → go to **SQL** tab
2. Copy and run the contents of `database.sql`
3. This creates the `coffee_shop` database with sample data

### 3. Run the Project
1. Copy the entire `coffee-crud` folder to:
   ```
   C:\xampp\htdocs\coffee-crud
   ```
2. Start **Apache** and **MySQL** in XAMPP Control Panel
3. Open browser → `http://localhost/coffee-crud/frontend/index.html`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu/read.php` | Get all menu items |
| POST | `/api/menu/create.php` | Add a new menu item |
| PUT | `/api/menu/update.php` | Update existing item |
| DELETE | `/api/menu/delete.php` | Delete a menu item |

## Features
- Full CRUD operations
- Category filter tabs
- Available/Unavailable toggle
- Responsive design
- Toast notifications
