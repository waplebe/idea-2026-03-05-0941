# Simple Task Manager API

**Description:**

This project provides a simple RESTful API for managing tasks. It allows users to create, read, update, and delete tasks. A basic frontend is included for interacting with the API.

**Why it's useful:**

This project demonstrates a full-stack web application using Python (Flask) for the backend and HTML/JavaScript for the frontend. It's a practical example for learning API development, database interaction, and frontend development.  It's a simplified version of a task manager, suitable for learning and experimentation.

**Installation & Setup:**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/simple-task-manager.git
    cd simple-task-manager
    ```

2.  **Set up the backend:**
    *   Create a `.env` file in the root directory and populate it with the following (replace with your actual values):
        ```
        DATABASE_URL=sqlite:///tasks.db
        ```
    *   Run the backend server:
        ```bash
        python app.py
        ```

3.  **Set up the frontend:**
    *   Open `index.html` in your web browser.

4.  **Install Dependencies (Frontend):**
    ```bash
    npm install
    ```

**API Endpoints:**

*   `GET /tasks`: Retrieves all tasks.
*   `GET /tasks/{id}`: Retrieves a specific task by ID.
*   `POST /tasks`: Creates a new task.  Request body should be a JSON object with `title` and `description` fields.
*   `PUT /tasks/{id}`: Updates an existing task by ID. Request body should be a JSON object with `title` and/or `description` fields.
*   `DELETE /tasks/{id}`: Deletes a task by ID.

**Example Usage:**

*   **Create a task:**
    `POST /tasks`
    Request Body:
    ```json
    {
      "title": "Grocery Shopping",
      "description": "Buy milk, eggs, and bread"
    }
    ```
    Response:
    ```json
    {
      "id": 1,
      "title": "Grocery Shopping",
      "description": "Buy milk, eggs, and bread",
      "created_at": "2023-10-27T10:00:00"
    }
    ```

*   **Get all tasks:**
    `GET /tasks`
    Response:
    ```json
    [
      {
        "id": 1,
        "title": "Grocery Shopping",
        "description": "Buy milk, eggs, and bread",
        "created_at": "2023-10-27T10:00:00"
      }
    ]
    ```

**New Features:**

*   **Test Endpoint:** Added a `/tasks/test` endpoint to verify the API is functioning correctly.
*   **Task Deletion Confirmation:** Implemented a confirmation dialog before deleting a task.
*   **Improved Task List Refresh:**  The task list now refreshes after creating and deleting tasks.
*   **Content-Type Header:** Added `Content-Type: application/json` header to POST requests.

**License:**

MIT License