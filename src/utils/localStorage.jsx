const employees = [
    {
        "id": 1,
        "firstName": "Gourav Vyas",
        "email": "gourav@1.com",
        "password": "123",
        "department": "Marketing",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "taskId": crypto.randomUUID(),
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Handle Social Media Accounts",
                "taskDescription": "Market the product to more and more customers",
                "taskDate": "2025-01-12",
                "category": "Design"
            },
            {
                "taskId": crypto.randomUUID(),
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Fix Bugs",
                "taskDescription": "Resolve bugs reported in issue tracker",
                "taskDate": "2025-01-14",
                "category": "Development"
            }
        ]
    },
    {
        "id": 2,
        "firstName": "Deepanshi Goyal",
        "email": "deepanshi@2.com",
        "password": "456",
        "department": "Development",
        "taskCounts": {
            "active": 1,
            "newTask": 0,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "taskId": crypto.randomUUID(),
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Website Optimization",
                "taskDescription": "Optimize website for better performance",
                "taskDate": "2025-01-11",
                "category": "Database"
            },
            {
                "taskId": crypto.randomUUID(),
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Interviews",
                "taskDescription": "Schedule and take interviews of freshers",
                "taskDate": "2025-01-09",
                "category": "HR"
            }
        ]
    },
    {
        "id": 3,
        "firstName": "Lochan Dhiran",
        "email": "lochan@3.com",
        "password": "789",
        "department": "Design",
        "taskCounts": {
            "active": 2,
            "newTask": 1,
            "completed": 0,
            "failed": 1
        },
        "tasks": [
            {
                "taskId": crypto.randomUUID(),
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Create UI Designs",
                "taskDescription": "Design the user interface for the new mobile app",
                "taskDate": "2025-01-15",
                "category": "UI/UX"
            },
            {
                "taskId": crypto.randomUUID(),
                "active": true,
                "newTask": false,
                "completed": false,
                "failed": false,
                "taskTitle": "Prototype Testing",
                "taskDescription": "Conduct usability testing for the new UI designs",
                "taskDate": "2025-01-16",
                "category": "Testing"
            }
        ]
    },
    {
        "id": 4,
        "firstName": "Dharam Raj",
        "email": "dharam@4.com",
        "password": "987",
        "department": "Development",
        "taskCounts": {
            "active": 1,
            "newTask": 1,
            "completed": 2,
            "failed": 0
        },
        "tasks": [
            {
                "taskId": crypto.randomUUID(),
                "active": true,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Develop Authentication System",
                "taskDescription": "Implement login and authentication for the web app",
                "taskDate": "2025-01-10",
                "category": "Backend"
            },
            {
                "taskId": crypto.randomUUID(),
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "API Development",
                "taskDescription": "Build RESTful APIs for mobile app integration",
                "taskDate": "2025-01-08",
                "category": "Backend"
            },
            {
                "taskId": crypto.randomUUID(),
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Database Setup",
                "taskDescription": "Configure and optimize the PostgreSQL database",
                "taskDate": "2025-01-07",
                "category": "Database"
            }
        ]
    },
    {
        "id": 5,
        "firstName": "Chanchal Mehta",
        "email": "chanchal@5.com",
        "password": "654",
        "department": "HR",
        "taskCounts": {
            "active": 0,
            "newTask": 1,
            "completed": 1,
            "failed": 0
        },
        "tasks": [
            {
                "taskId": crypto.randomUUID(),
                "active": false,
                "newTask": true,
                "completed": false,
                "failed": false,
                "taskTitle": "Onboarding New Employees",
                "taskDescription": "Manage paperwork and introduction sessions for new hires",
                "taskDate": "2025-01-12",
                "category": "HR"
            },
            {
                "taskId": crypto.randomUUID(),
                "active": false,
                "newTask": false,
                "completed": true,
                "failed": false,
                "taskTitle": "Conduct Employee Training",
                "taskDescription": "Organize a training session on workplace ethics",
                "taskDate": "2025-01-10",
                "category": "HR"
            }
        ]
    }
];

const admin = [
    {
        "id": 1,
        "email": "admin@me.com",
        "password": "123"
    }
];

// ✅ Function to assign unique task IDs dynamically if missing
const assignTaskIds = () => {
    employees.forEach(employee => {
        employee.tasks.forEach(task => {
            if (!task.taskId) {
                task.taskId = crypto.randomUUID();
            }
        });
    });
};

// ✅ Set data in localStorage with unique task IDs
export const setLocalStorage = () => {
    assignTaskIds();
    localStorage.setItem('employees', JSON.stringify(employees));
    localStorage.setItem('admin', JSON.stringify(admin));
};

// ✅ Retrieve data from localStorage
export const getLocalStorage = () => {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const admin = JSON.parse(localStorage.getItem('admin')) || [];
    return { employees, admin };
};
