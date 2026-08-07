require("dotenv").config();

const bcrypt = require("bcryptjs");
const { pool, withTransaction } = require("../config/db.js");

const PASSWORD = "Test@1234";
const DAY = 86400000;

const COLUMNS = ["Todo", "In Progress", "Review", "Done"];


// USERS
const USERS = [
  { key: "alex", name: "Alex Rivera", email: "alex@timetoprogram.com" },
  { key: "maya", name: "Maya Chen", email: "maya@timetoprogram.com" },
  { key: "diego", name: "Diego Santos", email: "diego@timetoprogram.com" },
  { key: "priya", name: "Priya Nair", email: "priya@timetoprogram.com" },
  { key: "sam", name: "Sam Okafor", email: "sam@timetoprogram.com" },
  { key: "lena", name: "Lena Fischer", email: "lena@timetoprogram.com" },
  { key: "john", name: "John Miller", email: "john@timetoprogram.com" },
  { key: "emma", name: "Emma Watson", email: "emma@timetoprogram.com" },
  { key: "liam", name: "Liam Brown", email: "liam@timetoprogram.com" },
  { key: "olivia", name: "Olivia Clark", email: "olivia@timetoprogram.com" },
  { key: "noah", name: "Noah Wilson", email: "noah@timetoprogram.com" },
  { key: "ava", name: "Ava Thomas", email: "ava@timetoprogram.com" },
  { key: "ethan", name: "Ethan Scott", email: "ethan@timetoprogram.com" },
  { key: "mia", name: "Mia Davis", email: "mia@timetoprogram.com" },
  { key: "lucas", name: "Lucas Moore", email: "lucas@timetoprogram.com" },
  { key: "sophia", name: "Sophia Lee", email: "sophia@timetoprogram.com" },
  { key: "ryan", name: "Ryan Taylor", email: "ryan@timetoprogram.com" },
  { key: "grace", name: "Grace Hall", email: "grace@timetoprogram.com" },
  { key: "daniel", name: "Daniel White", email: "daniel@timetoprogram.com" },
  { key: "zoe", name: "Zoe Martin", email: "zoe@timetoprogram.com" },
];

// BOARDS

const BOARDS = [
  {
    title: "Product Roadmap",
    description: "Quarterly planning, OKRs and roadmap execution.",
    color: "#2f8159",
    owner: "alex",
    members: ["maya", "diego", "priya"],
    updatedDaysAgo: 0.3,
    tasks: [
      "Define Q3 OKRs",
      "Prioritize feature backlog",
      "Roadmap planning",
      "Competitor analysis",
      "Customer interviews",
      "Release planning",
      "Prepare sprint goals",
      "Stakeholder alignment",
      "Risk assessment",
      "Launch roadmap",
    ],
  },
  {
    title: "Website Redesign",
    description: "Complete redesign of company website.",
    color: "#2196F3",
    owner: "maya",
    members: ["alex", "sam", "lena"],
    updatedDaysAgo: 1,
    tasks: [
      "Landing page",
      "Navbar redesign",
      "Footer update",
      "Dark mode",
      "Hero banner",
      "Optimize images",
      "SEO improvements",
      "Animations",
      "Accessibility audit",
      "Production deployment",
    ],
  },
  {
    title: "Mobile App",
    description: "Flutter application development.",
    color: "#9C27B0",
    owner: "priya",
    members: ["alex", "emma", "john"],
    updatedDaysAgo: 2,
    tasks: [
      "Authentication",
      "Dashboard",
      "Push Notifications",
      "Offline Mode",
      "User Profile",
      "API Integration",
      "Testing",
      "Performance",
      "Play Store Assets",
      "Release Build",
    ],
  },
  {
    title: "CRM System",
    description: "Internal CRM for sales team.",
    color: "#FF5722",
    owner: "sam",
    members: ["john", "emma", "alex"],
    updatedDaysAgo: 4,
    tasks: [
      "Lead Module",
      "Contact Module",
      "Deal Pipeline",
      "Reports",
      "Export CSV",
      "Import Data",
      "Dashboard",
      "Email Integration",
      "Notifications",
      "Deploy",
    ],
  },
  {
    title: "AI Chatbot",
    description: "Customer support AI assistant.",
    color: "#673AB7",
    owner: "diego",
    members: ["maya", "alex", "priya"],
    updatedDaysAgo: 1,
    tasks: [
      "Prompt Design",
      "Intent Detection",
      "Context Memory",
      "Fine Tune",
      "API",
      "Frontend",
      "Streaming",
      "Logs",
      "Analytics",
      "Launch",
    ],
  },
  {
    title: "E-Commerce",
    description: "Modern MERN online store.",
    color: "#E91E63",
    owner: "john",
    members: ["emma", "liam", "ava"],
    updatedDaysAgo: 3,
    tasks: [
      "Products",
      "Cart",
      "Checkout",
      "Stripe",
      "Wishlist",
      "Coupons",
      "Orders",
      "Admin Panel",
      "Reviews",
      "Deployment",
    ],
  },
  {
    title: "Inventory",
    description: "Warehouse management.",
    color: "#3F51B5",
    owner: "emma",
    members: ["alex", "noah", "mia"],
    updatedDaysAgo: 5,
    tasks: [
      "Items",
      "Categories",
      "Suppliers",
      "Purchase Orders",
      "Stock Alerts",
      "Barcode",
      "Reports",
      "History",
      "Analytics",
      "Release",
    ],
  },
  {
    title: "HR Portal",
    description: "Employee management.",
    color: "#00BCD4",
    owner: "lena",
    members: ["sam", "zoe", "grace"],
    updatedDaysAgo: 7,
    tasks: [
      "Attendance",
      "Leave",
      "Payroll",
      "Recruitment",
      "Policies",
      "Dashboard",
      "Calendar",
      "Notifications",
      "Reports",
      "Deploy",
    ],
  },
  {
    title: "Learning Platform",
    description: "Online LMS.",
    color: "#795548",
    owner: "grace",
    members: ["alex", "maya", "john"],
    updatedDaysAgo: 8,
    tasks: [
      "Courses",
      "Lessons",
      "Videos",
      "Assignments",
      "Quiz",
      "Certificates",
      "Payments",
      "Discussion",
      "Dashboard",
      "Launch",
    ],
  },
  {
    title: "Finance Dashboard",
    description: "Business analytics.",
    color: "#4CAF50",
    owner: "zoe",
    members: ["ryan", "ethan", "ava"],
    updatedDaysAgo: 1,
    tasks: [
      "Revenue",
      "Expenses",
      "Charts",
      "Profit",
      "Forecast",
      "Export",
      "Filters",
      "Authentication",
      "Settings",
      "Deploy",
    ],
  },
  {
    title: "Marketing Campaign",
    description: "Q4 campaign.",
    color: "#F44336",
    owner: "ryan",
    members: ["grace", "alex", "emma"],
    updatedDaysAgo: 2,
    tasks: [
      "Email",
      "Ads",
      "Landing",
      "Social Media",
      "SEO",
      "Blog",
      "Videos",
      "Influencers",
      "Reports",
      "Launch",
    ],
  },
  {
    title: "DevOps",
    description: "Infrastructure automation.",
    color: "#607D8B",
    owner: "ethan",
    members: ["alex", "sam", "john"],
    updatedDaysAgo: 6,
    tasks: [
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Nginx",
      "SSL",
      "Backups",
      "Logging",
      "Monitoring",
      "Scaling",
      "Production",
    ],
  },
];

const COL_CYCLE = [0, 1, 1, 2, 3, 0, 2, 3, 1, 3, 0, 1];
const PRIO_CYCLE = ["medium", "high", "low", "urgent", "medium", "high", "low", "urgent"];
const DUE_CYCLE = [-9, 2, null, 5, -2, 14, 1, null, 20, -4, 6, 9, 3, null, 12, -1, 7];

const run = async () => {
  const taskTotal = await withTransaction(async (c) => {
    await c.query("DELETE FROM users WHERE email = ANY($1)", [
      USERS.map((u) => u.email.toLowerCase()),
    ]);

    const hash = await bcrypt.hash(PASSWORD, 10);
    const uid = {};

    for (const u of USERS) {
      const { rows } = await c.query(
        `INSERT INTO users (name, email, password_hash, created_at)
         VALUES ($1, $2, $3, now() - interval '60 days')
         RETURNING id`,
        [u.name, u.email.toLowerCase(), hash]
      );

      uid[u.key] = rows[0].id;
    }

    let taskCount = 0;

    for (const b of BOARDS) {
      const ownerId = uid[b.owner];
      const updatedAt = new Date(Date.now() - b.updatedDaysAgo * DAY);

      const { rows: br } = await c.query(
        `INSERT INTO boards (title, description, color, owner_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, now() - interval '45 days', $5)
         RETURNING id`,
        [b.title, b.description, b.color, ownerId, updatedAt]
      );

      const boardId = br[0].id;

      let memberKeys = [b.owner, ...b.members];
      if (!memberKeys.includes("alex")) memberKeys.push("alex");
      memberKeys = [...new Set(memberKeys)];

      for (let mi = 0; mi < memberKeys.length; mi++) {
        const mk = memberKeys[mi];
        const role = mk === b.owner ? "owner" : mi === 1 ? "admin" : "member";

        await c.query(
          `INSERT INTO board_members (board_id, user_id, role)
           VALUES ($1, $2, $3)
           ON CONFLICT DO NOTHING`,
          [boardId, uid[mk], role]
        );
      }

      const colIds = [];

      for (let i = 0; i < COLUMNS.length; i++) {
        const { rows: cr } = await c.query(
          `INSERT INTO columns (board_id, title, position)
           VALUES ($1, $2, $3)
           RETURNING id`,
          [boardId, COLUMNS[i], (i + 1) * 1000]
        );

        colIds.push(cr[0].id);
      }

      // ---- tasks for this board ----
      const assignPool = ["alex", "alex", ...memberKeys];

      for (let i = 0; i < b.tasks.length; i++) {
        const colIdx = COL_CYCLE[i % COL_CYCLE.length];
        const priority = PRIO_CYCLE[(i + b.title.length) % PRIO_CYCLE.length];
        const offset = DUE_CYCLE[(i + b.tasks.length) % DUE_CYCLE.length];
        const dueDate = offset === null ? null : new Date(Date.now() + offset * DAY);

        const assigneeKey = i % 5 === 4 ? null : assignPool[i % assignPool.length];
        const assigneeId = assigneeKey ? uid[assigneeKey] : null;

        await c.query(
          `INSERT INTO tasks
            (board_id, column_id, title, description, priority, due_date,
             assignee_id, position, created_by, created_at, updated_at)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,now() - interval '20 days',$10)`,
          [
            boardId,
            colIds[colIdx],
            b.tasks[i],
            i % 3 === 0 ? `${b.tasks[i]} — details and acceptance criteria.` : null,
            priority,
            dueDate,
            assigneeId,
            (i + 1) * 1000,
            ownerId,
            updatedAt,
          ]
        );

        taskCount += 1;
      }

      // ---- activity log for this board ----
      const ownerName = USERS.find((u) => u.key === b.owner).name;

      const acts = [
        {
          action: "board.created",
          message: `${ownerName} created the board`,
        },
        {
          action: "task.created",
          message: `${ownerName} added "${b.tasks[0]}"`,
        },
      ];

      for (let ai = 0; ai < acts.length; ai++) {
        await c.query(
          `INSERT INTO activities
            (board_id, user_id, action, message, created_at)
           VALUES ($1,$2,$3,$4,now() - ($5 || ' hours')::interval)`,
          [boardId, ownerId, acts[ai].action, acts[ai].message, (ai + 1) * 7]
        );
      }
    }

    return taskCount;
  });

  console.log(`✅ Seed complete. Inserted ${taskTotal} tasks.`);
};

run()
  .catch((err) => {
    console.error("❌ Seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());