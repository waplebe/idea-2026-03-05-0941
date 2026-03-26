from flask import Flask, jsonify, request
import sqlite3
import os
import datetime

app = Flask(__name__)

DATABASE_URL = os.environ.get('DATABASE_URL', 'sqlite:///tasks.db')

def get_db_connection():
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = get_db_connection()
    tasks = conn.execute('SELECT * FROM tasks').fetchall()
    conn.close()
    return jsonify([dict(task) for task in tasks])

@app.route('/tasks/<int:id>', methods=['GET'])
def get_task(id):
    conn = get_db_connection()
    task = conn.execute('SELECT * FROM tasks WHERE id = ?', (id,)).fetchone()
    conn.close()
    if task is None:
        return jsonify({'message': 'Task not found'}), 404
    return jsonify(dict(task))

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    if not title:
        return jsonify({'message': 'Title is required'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO tasks (title, description, created_at) VALUES (?, ?, ?)', (title, description, datetime.datetime.now()))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()

    return jsonify({'id': task_id, 'title': title, 'description': description}), 201

@app.route('/tasks/<int:id>', methods=['PUT'])
def update_task(id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE tasks SET title = ?, description = ? WHERE id = ?', (title, description, id))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Task not found'}), 404

    return jsonify({'id': id, 'title': title, 'description': description})

@app.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tasks WHERE id = ?', (id,))
    conn.commit()
    conn.close()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Task not found'}), 404

    return jsonify({'message': 'Task deleted'})

if __name__ == '__main__':
    app.run(debug=True)