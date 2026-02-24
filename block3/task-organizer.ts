// Task Organizer - Example combining arrays and tuples
// Demonstrates how to use arrays and tuples together in a real-world application

// Define types
type TaskPriority = "Low" | "Medium" | "High";
type TaskStatus = "Todo" | "InProgress" | "Done";
// A task is represented as a tuple: [id, name, description, priority, status, dueDate, tags]
type Task = [
    number,         // id
    string,         // name 
    string,         // description
    TaskPriority,   // priority
    TaskStatus,     // status
    Date,           // dueDate
    string[]        // tags
];

// Sample task data
const tasks: Task[] = [
    [1, "Update documentation", "Review and update the API docs", "Medium", "Todo", new Date("2023-12-15"), ["docs", "writing"]],
    [2, "Fix login bug", "Users unable to login on Firefox", "High", "InProgress", new Date("2023-11-30"), ["bug", "critical"]],
    [3, "Add new feature", "Implement dark mode", "Medium", "Todo", new Date("2023-12-31"), ["feature", "ui"]],
    [4, "Refactor tests", "Clean up duplicated test code", "Low", "Done", new Date("2023-11-15"), ["testing", "cleanup"]],
    [5, "Security audit", "Perform security review", "High", "Todo", new Date("2023-12-10"), ["security", "audit"]]
];

// Helper functions for formatting
function formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
}

function formatTask(task: Task): string {
    const [id, name, description, priority, status, dueDate, tags] = task;
    return `[${id}] ${name} (${priority}) - ${status} - Due: ${formatDate(dueDate)} - Tags: ${tags.join(', ')}`;
}

// Function to add a new task
function addTask(tasks: Task[], task: Task): Task[] {
    return [...tasks, task];
}

// Function to find tasks by status
function findTasksByStatus(tasks: Task[], status: TaskStatus): Task[] {
    return tasks.filter(task => task[4] === status);
}

// Function to find tasks by priority
function findTasksByPriority(tasks: Task[], priority: TaskPriority): Task[] {
    return tasks.filter(task => task[3] === priority);
}

// Function to find tasks by tag
function findTasksByTag(tasks: Task[], tag: string): Task[] {
    return tasks.filter(task => task[6].includes(tag));
}

// Function to update task status
function updateTaskStatus(tasks: Task[], id: number, newStatus: TaskStatus): Task[] {
    return tasks.map(task => {
        if (task[0] === id) {
            // Create a new tuple with the updated status
            // We destructure the original task and override the status (index 4)
            return [task[0], task[1], task[2], task[3], newStatus, task[5], task[6]];
        }
        return task;
    });
}

// Function to sort tasks by due date
function sortTasksByDueDate(tasks: Task[], ascending: boolean = true): Task[] {
    return [...tasks].sort((a, b) => {
        const dateA = a[5].getTime();
        const dateB = b[5].getTime();
        return ascending ? dateA - dateB : dateB - dateA;
    });
}

// Display all tasks
console.log("===== All Tasks =====");
tasks.forEach(task => console.log(formatTask(task)));

// Add a new task
console.log("\n===== After Adding a New Task =====");
const newTask: Task = [
    6, 
    "Prepare presentation", 
    "Create slides for next team meeting", 
    "Medium", 
    "Todo", 
    new Date("2023-12-05"), 
    ["presentation", "meeting"]
];
const updatedTasks = addTask(tasks, newTask);
updatedTasks.forEach(task => console.log(formatTask(task)));

// Find high priority tasks
console.log("\n===== High Priority Tasks =====");
const highPriorityTasks = findTasksByPriority(updatedTasks, "High");
highPriorityTasks.forEach(task => console.log(formatTask(task)));

// Find tasks with "bug" tag
console.log("\n===== Tasks Tagged as 'bug' =====");
const bugTasks = findTasksByTag(updatedTasks, "bug");
bugTasks.forEach(task => console.log(formatTask(task)));

// Update task status
console.log("\n===== After Updating Task Status =====");
const tasksWithStatusUpdate = updateTaskStatus(updatedTasks, 2, "Done");
tasksWithStatusUpdate.forEach(task => console.log(formatTask(task)));

// Sort tasks by due date
console.log("\n===== Tasks Sorted by Due Date (Earliest First) =====");
const sortedTasks = sortTasksByDueDate(tasksWithStatusUpdate);
sortedTasks.forEach(task => console.log(formatTask(task))); 