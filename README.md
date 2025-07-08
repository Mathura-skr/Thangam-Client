# Thangam Client – Complete Documentation

## Project Overview

**Thangam Client** is a web application designed for the rental and sales of gardening tools and fertilizers. It caters to home gardeners, landscaping businesses, and professionals who wish to buy or rent high-quality gardening equipment and agricultural inputs.

The project is built using **React** (bootstrapped with Create React App) and communicates with a backend API (not included in this client repository) to manage products, rentals, orders, users, suppliers, and reviews.

---

## Table of Contents

1. [Project Features](#project-features)
2. [Use Case Diagram](#use-case-diagram)
3. [Sequence Diagrams](#sequence-diagrams)
4. [ER Diagram](#er-diagram)
5. [Setup Instructions](#setup-instructions)
6. [Application Structure](#application-structure)
7. [Key Pages and Components](#key-pages-and-components)

---

## Project Features

- **Product Catalog**: Browse gardening tools and fertilizers, available for sale or rent.
- **Rental Management**: Staff and admins can add, update, and manage rental products.
- **Order Management**: Users can place orders for purchase or rental; staff/admins can manage these.
- **Supplier Management**: Add and update supplier details for inventory tracking.
- **User Management**: Authentication, role-based access (admin, staff, user), and profile management.
- **Reviews**: Users can review products; admins can moderate reviews.
- **Dashboard**: Role-based dashboards for staff and admins to view statistics and manage inventory.
- **Search**: Live product search with suggestions.
- **Responsive UI**: Modern, responsive interface with clear navigation.

---

## Use Case Diagram

```mermaid

graph TD
  User((User))
  Staff((Staff))
  Admin((Admin))

  %% User Actions
  User -- Browse Products --> BP[Browse Products]
  User -- Search Products --> SP[Search Products]
  User -- Place Order --> PO[Place Order]
  User -- View Rent Product --> RP[View Rent Product]
  User -- Write Review --> WR[Write Review]
  User -- View Profile --> VP[View Profile]

  %% Staff Actions
  Staff -- Add/Update Products --> AUP[Add/Update Products]
  Staff -- Add/Update Rentals --> AUR[Add/Update Rentals]
  Staff -- Manage Orders --> MO[Manage Orders]
  Staff -- Manage Suppliers --> MS[Manage Suppliers]
  Staff -- View Dashboard --> VD[View Dashboard]
  Staff -- Generate Reports --> GR[Generate Reports]

  %% Admin Actions
  Admin -- All Staff Use Cases --> Staff
  Admin -- Manage Users --> MU[Manage Users]
  Admin -- Moderate Reviews --> MR[Moderate Reviews]
  Admin -- View Sales/Rental Reports --> SRR[View Sales/Rental Reports]

```

---

## Sequence Diagrams

### Sequence: for overall 

```mermaid
 sequenceDiagram
    participant User
    participant Frontend
    participant Backend API
    participant Staff
    participant Admin

    %% Registration & Login
    User->>Frontend: Register/Login
    Frontend->>Backend API: Submit credentials
    Backend API-->>Frontend: Auth success/failure
    Frontend-->>User: Show login status

    %% Product Browsing & Search
    User->>Frontend: Browse/Search Products
    Frontend->>Backend API: Request product list
    Backend API-->>Frontend: Return product list
    Frontend-->>User: Display products

    %% View Rental Tools & Check Availability
    User->>Frontend: View Rental Tools
    Frontend->>Backend API: Request rental tools
    Backend API-->>Frontend: Return rental tools
    User->>Frontend: Check Tool Availability
    Frontend->>Backend API: Query availability
    Backend API-->>Frontend: Return availability info
    Frontend-->>User: Display availability

    Note over User, Staff: If available, user contacts staff via call/message to rent

    %% Cart Management & Order
    User->>Frontend: Add to Cart
    Frontend->>Backend API: Update cart
    User->>Frontend: Checkout
    Frontend->>Backend API: Submit order
    Backend API-->>Frontend: Return order confirmation
    Backend API->>Staff: Notify new order

    %% Review & Profile
    User->>Frontend: Submit Review / View Profile
    Frontend->>Backend API: Post review / Fetch profile
    Backend API-->>Frontend: Success/Fail
    Frontend-->>User: Display status

    %% Staff & Admin Actions
    Staff->>Backend API: Manage Products/Rentals
    Staff->>Backend API: Update Inventory/Orders
    Admin->>Backend API: Manage Users
    Admin->>Backend API: Moderate Reviews
    Admin->>Backend API: View Sales/Rental Reports


```

---

## ER Diagram

```mermaid
erDiagram
    USERS {
      int id PK
      string name
      string email
      string password
      string phone
      string role
      datetime created_at
    }

    ADDRESSES {
      int id PK
      int user_id FK
      string street
      string city
      string district
      string province
      string zip_code
      string address_type
    }

    SUPPLIERS {
      int id PK
      string name
      string contact_info
      string address
    }

    PRODUCTS {
      int id PK
      string name
      string description
      float price
      int stock
      int supplier_id FK
      datetime created_at
    }

    ORDERS {
      int id PK
      int user_id FK
      int address_id FK
      float total
      string status
      datetime created_at
    }

    ORDER_ITEMS {
      int id PK
      int order_id FK
      int product_id FK
      int quantity
      float price
    }

    CARTS {
      int id PK
      int user_id FK
      datetime created_at
    }

    CART_ITEMS {
      int id PK
      int cart_id FK
      int product_id FK
      int quantity
    }

    REVIEWS {
      int id PK
      int user_id FK
      int product_id FK
      int rating
      string comment
      datetime created_at
    }

    USERS ||--o{ ADDRESSES : has
    USERS ||--o{ ORDERS : places
    USERS ||--o{ CARTS : owns
    USERS ||--o{ REVIEWS : writes
    ORDERS ||--o{ ORDER_ITEMS : contains
    PRODUCTS ||--o{ ORDER_ITEMS : part_of
    CARTS ||--o{ CART_ITEMS : contains
    PRODUCTS ||--o{ CART_ITEMS : added
    PRODUCTS ||--o{ REVIEWS : reviewed
    SUPPLIERS ||--o{ PRODUCTS : supplies
    ORDERS ||--|| ADDRESSES : delivers_to

```

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Mathura-skr/Thangam-Client.git
   cd Thangam-Client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000/`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

> **Note:** This is a client-only repository. Ensure the backend API is running and the API endpoints are correctly configured in the project.

---

## Application Structure

- `src/components/`: Reusable UI components (e.g., Navigation)
- `src/pages/`: Main pages (Home, About Us, Staff/Admin dashboards, Product lists)
- `src/Routes/`: Routing configuration
- `src/context/`: Authentication context
- `src/assets/`: Static images and assets

Example route imports (from `src/Routes/RouteLayout.jsx`):

- `/admin/*` — Admin functions (products, rentals, sales, reviews)
- `/staff/*` — Staff functions (products, rentals, suppliers)
- `/` — Public pages (Home, About, Product catalog, etc.)

---

## Key Pages and Components

- **Home Page (`src/pages/home/HomePage.jsx`)**: Promotional hero, quick actions, and navigation to main features.
- **About Us (`src/pages/AboutUs/Aboutus.jsx`)**: Overview of company and mission.
- **Product Management (`src/pages/Staff/NewProduct.jsx`, `src/pages/Staff/NewRentalProduct.jsx`)**: Forms for staff to add new products or rental items, fetching suppliers dynamically.
- **User Authentication and Context (`src/context/authContext.js`)**: Handles user login, logout, and role management.
- **Navigation Bar (`src/components/Navbar/Navigation.jsx`)**: Responsive nav with live search and user context.

---
