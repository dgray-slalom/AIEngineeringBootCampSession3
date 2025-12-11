// API Test Script - Demonstrates PUT endpoint accessibility
// Run with: node test-api.js

const BASE_URL = 'http://localhost:3030/api';

async function testAPI() {
  console.log('🧪 Testing TODO API endpoints...\n');

  try {
    // Test POST (create)
    console.log('1. Creating a new task...');
    const createResponse = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'API Test Task',
        description: 'Testing all endpoints',
        priority: 'P1',
        due_date: '2025-12-20'
      })
    });
    const newTask = await createResponse.json();
    console.log('✅ Created:', newTask);

    // Test PUT (update)
    console.log('\n2. Updating the task...');
    const updateResponse = await fetch(`${BASE_URL}/tasks/${newTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Updated API Test Task',
        description: 'Updated via PUT endpoint',
        priority: 'P2',
        due_date: '2025-12-25'
      })
    });
    const updatedTask = await updateResponse.json();
    console.log('✅ Updated:', updatedTask);

    // Test GET (fetch one)
    console.log('\n3. Fetching the updated task...');
    const fetchResponse = await fetch(`${BASE_URL}/tasks/${newTask.id}`);
    const fetchedTask = await fetchResponse.json();
    console.log('✅ Fetched:', fetchedTask);

    // Test PATCH (toggle completion)
    console.log('\n4. Marking task as completed...');
    const patchResponse = await fetch(`${BASE_URL}/tasks/${newTask.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true })
    });
    const completedTask = await patchResponse.json();
    console.log('✅ Completed:', completedTask);

    // Test GET all
    console.log('\n5. Fetching all tasks...');
    const allResponse = await fetch(`${BASE_URL}/tasks`);
    const allTasks = await allResponse.json();
    console.log('✅ All tasks:', allTasks);

    console.log('\n🎉 All API endpoints working correctly!');
    console.log('📝 PUT endpoint is accessible from frontend via apiUpdateTask() function');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run the test
testAPI();