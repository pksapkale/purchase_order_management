# Purchase Order Management System

Welcome to the Purchase Order Management System repository! This system aims to simplify and enhance the management of purchase orders.
This is a very good example of CRUD operations with API manipulation and server configurations
Follow the steps below to set it up on your local machine and start collaborating.

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following installed on your machine:

1. [Node.js](https://nodejs.org/) - Latest LTS Version
2. [Angular](https://angular.io/) - Latest Version
3. [MySQL](https://www.mysql.com/) - Install MySQL and import the 'db.sql' file into your MySQL database. Find the 'db.sql' file in the root directory of the project.

### Installation

1.   **Clone The Repository:**

      ```bash
      git clone https://github.com/your-username/purchase_order_management.git
      cd purchase_order_management
      ```

2.   **Install node packages:**
      ```bash
      cd po_server
      npm i
      ```
      
3.   **Start Server:**
      ```bash
      npm start
      ```

4.   **Istall UI Dependencies**

      ```bash
      cd po_ui
      npm i
      npm start
      ```

5.   **Reminder:**
      (*) Make sure you have imported db.sql file in your mysql db
      (*) Created .env file in po_server (you can take refrence from env.js file)
