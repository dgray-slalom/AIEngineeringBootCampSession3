import React, { useState } from 'react';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskList from './TaskList';
import TaskForm from './TaskForm';

// Local storage helper functions
const TASKS_STORAGE_KEY = 'todo-tasks';

const getTasksFromStorage = () => {
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading tasks from storage:', error);
    return [];
  }
};

const saveTasksToStorage = (tasks) => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to storage:', error);
  }
};

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSave = async (taskData) => {
    const tasks = getTasksFromStorage();
    
    if (editingTask) {
      // Edit existing task
      const updatedTasks = tasks.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData, priority: taskData.priority || 'P3' }
          : task
      );
      saveTasksToStorage(updatedTasks);
      setEditingTask(null);
    } else {
      // Add new task
      const newTask = {
        id: Date.now(), // Simple ID generation
        title: taskData.title,
        description: taskData.description || '',
        due_date: taskData.due_date || null,
        priority: taskData.priority || 'P3',
        completed: false,
        created_at: new Date().toISOString()
      };
      saveTasksToStorage([...tasks, newTask]);
    }
    setRefreshKey(k => k + 1);
  };

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#f5f5f5',
          pb: 4
        }}
      >
        <AppBar
          position="static"
          sx={{
            background: '#1976d2',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Toolbar>
            <CheckCircleOutlineIcon sx={{ mr: 2, fontSize: 28 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.5px'
              }}
            >
              TODO App
            </Typography>
          </Toolbar>
        </AppBar>
        <Container 
          maxWidth="md" 
          sx={{ 
            mt: 4,
            height: 'calc(100vh - 120px)', 
            display: 'flex', 
            flexDirection: 'column',
            overflow: 'hidden'
          }}
        >
          <Box sx={{ mb: 2, flexShrink: 0 }}>
            <TaskForm onSave={handleSave} initialTask={editingTask} />
          </Box>
          <Box sx={{ flexGrow: 1, minHeight: 0, overflow: 'hidden' }}>
            <TaskList key={refreshKey} onEdit={setEditingTask} />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default App;
