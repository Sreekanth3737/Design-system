import type { Meta, StoryObj } from "@storybook/react";
import React, { useState, useCallback, useMemo } from "react";
import { Eye, Edit2, Trash2, Download, Mail, Phone } from "lucide-react";
import DataTable from "./DataTable";
import { Column, RowAction, DataTableProps, ColumnSelectOption } from "./types";
import { Button } from "../../atoms/Button";

// Enhanced sample data interfaces
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
  department: string;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  joinDate: string;
  salary: number;
  isActive: boolean;
  phone?: string;
  location: string;
  avatar?: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "in_stock" | "out_of_stock" | "low_stock";
  supplier: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  rating: number;
  reviews: number;
  featured: boolean;
  tags: string[];
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "todo" | "in_progress" | "review" | "completed";
  assignee: string;
  reporter: string;
  dueDate: string;
  createdAt: string;
  estimatedHours: number;
  actualHours: number;
  project: string;
  labels: string[];
}

// Enhanced data generators
const generateUsers = (count: number): User[] => {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Eve",
    "Frank",
    "Grace",
    "Henry",
    "Ivy",
    "Jack",
    "Kate",
    "Leo",
    "Mia",
    "Noah",
    "Olivia",
    "Paul",
    "Quinn",
    "Ruby",
    "Sam",
    "Tina",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Brown",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Rodriguez",
    "Martinez",
    "Hernandez",
    "Lopez",
    "Gonzalez",
    "Wilson",
    "Anderson",
    "Thomas",
    "Taylor",
    "Moore",
    "Jackson",
    "Martin",
  ];
  const roles = ["admin", "user", "moderator"] as const;
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "Support",
    "HR",
    "Finance",
    "Product",
    "Design",
  ];
  const statuses = ["active", "inactive", "pending"] as const;
  const locations = [
    "New York",
    "San Francisco",
    "Los Angeles",
    "Chicago",
    "Boston",
    "Seattle",
    "Austin",
    "Denver",
    "Miami",
    "Atlanta",
  ];

  return Array.from({ length: count }, (_, index) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const joinDate = new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 3
    );
    const lastLogin = new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
    );

    return {
      id: `user-${index + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      department: departments[Math.floor(Math.random() * departments.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      lastLogin: lastLogin.toISOString().split("T")[0],
      joinDate: joinDate.toISOString().split("T")[0],
      salary: Math.floor(Math.random() * 150000) + 50000,
      isActive: Math.random() > 0.2,
      phone: `+1 (${Math.floor(Math.random() * 900) + 100}) ${
        Math.floor(Math.random() * 900) + 100
      }-${Math.floor(Math.random() * 9000) + 1000}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
    };
  });
};

const generateProducts = (count: number): Product[] => {
  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Toys",
    "Automotive",
  ];
  const suppliers = [
    "TechCorp",
    "FashionInc",
    "BookWorld",
    "HomeSupply",
    "SportsPro",
    "BeautyBrand",
    "ToyFactory",
    "AutoParts",
  ];
  const statuses = ["in_stock", "out_of_stock", "low_stock"] as const;
  const adjectives = [
    "Amazing",
    "Premium",
    "Professional",
    "Deluxe",
    "Ultra",
    "Pro",
    "Advanced",
    "Smart",
    "Wireless",
    "Portable",
  ];
  const nouns = [
    "Laptop",
    "Smartphone",
    "Headphones",
    "Camera",
    "Watch",
    "Keyboard",
    "Mouse",
    "Monitor",
    "Tablet",
    "Speaker",
  ];

  return Array.from({ length: count }, (_, index) => {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const price = Math.floor(Math.random() * 2000) + 10;
    const stock = Math.floor(Math.random() * 1000);
    const createdAt = new Date(
      Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000
    );
    const updatedAt = new Date(
      createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
    );

    return {
      id: `prod-${index + 1}`,
      name: `${adjective} ${noun}`,
      category,
      price,
      stock,
      status:
        stock === 0 ? "out_of_stock" : stock < 10 ? "low_stock" : "in_stock",
      supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
      description: `High-quality ${adjective.toLowerCase()} ${noun.toLowerCase()} for all your needs.`,
      createdAt: createdAt.toISOString().split("T")[0],
      updatedAt: updatedAt.toISOString().split("T")[0],
      rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
      reviews: Math.floor(Math.random() * 500),
      featured: Math.random() > 0.7,
      tags: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () =>
          ["Popular", "New", "Sale", "Premium", "Limited"][
            Math.floor(Math.random() * 5)
          ]
      ),
    };
  });
};

const generateTasks = (count: number): Task[] => {
  const priorities = ["low", "medium", "high", "urgent"] as const;
  const statuses = ["todo", "in_progress", "review", "completed"] as const;
  const assignees = [
    "Alice Johnson",
    "Bob Smith",
    "Charlie Brown",
    "Diana Wilson",
    "Eve Davis",
  ];
  const reporters = [
    "Project Manager",
    "Tech Lead",
    "Product Owner",
    "Designer",
    "QA Lead",
  ];
  const projects = [
    "Website Redesign",
    "Mobile App",
    "API Integration",
    "Database Migration",
    "Security Audit",
  ];
  const taskTypes = [
    "Feature",
    "Bug Fix",
    "Enhancement",
    "Documentation",
    "Testing",
    "Research",
    "Maintenance",
  ];

  return Array.from({ length: count }, (_, index) => {
    const taskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const createdAt = new Date(
      Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
    );
    const dueDate = new Date(
      createdAt.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000
    );
    const estimatedHours = Math.floor(Math.random() * 40) + 1;
    const actualHours =
      status === "completed"
        ? Math.floor(Math.random() * estimatedHours * 1.5)
        : 0;

    return {
      id: `task-${index + 1}`,
      title: `${taskType}: Implement feature #${index + 1}`,
      description: `Detailed description for ${taskType.toLowerCase()} task involving implementation and testing.`,
      priority,
      status,
      assignee: assignees[Math.floor(Math.random() * assignees.length)],
      reporter: reporters[Math.floor(Math.random() * reporters.length)],
      dueDate: dueDate.toISOString().split("T")[0],
      createdAt: createdAt.toISOString().split("T")[0],
      estimatedHours,
      actualHours,
      project: projects[Math.floor(Math.random() * projects.length)],
      labels: Array.from(
        { length: Math.floor(Math.random() * 3) + 1 },
        () =>
          ["Frontend", "Backend", "UI/UX", "API", "Database", "Testing"][
            Math.floor(Math.random() * 6)
          ]
      ),
    };
  });
};

// Sample data
const sampleUsers = generateUsers(50);
const sampleProducts = generateProducts(100);
const sampleTasks = generateTasks(75);

// Column definitions
const userColumns: Column<User>[] = [
  {
    key: "name",
    header: "Name",
    sortable: true,
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
          {row.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      </div>
    ),
    width: "280px",
  },
  {
    key: "role",
    header: "Role",
    sortable: true,
    editable: true,
    type: "select",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
      { label: "Moderator", value: "moderator" },
    ],
    render: (value) => (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value === "admin"
            ? "bg-red-100 text-red-800"
            : value === "moderator"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {value}
      </span>
    ),
    width: "120px",
  },
  {
    key: "department",
    header: "Department",
    sortable: true,
    editable: true,
    type: "text",
    width: "130px",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    editable: true,
    type: "select",
    options: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Pending", value: "pending" },
    ],
    render: (value) => (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value === "active"
            ? "bg-green-100 text-green-800"
            : value === "inactive"
            ? "bg-gray-100 text-gray-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {value}
      </span>
    ),
    width: "100px",
  },
  {
    key: "salary",
    header: "Salary",
    sortable: true,
    editable: true,
    type: "number",
    render: (value) => (
      <span className="font-mono">${value?.toLocaleString()}</span>
    ),
    align: "right",
    width: "120px",
  },
  {
    key: "lastLogin",
    header: "Last Login",
    sortable: true,
    type: "date",
    render: (value) => <span className="text-sm font-mono">{value}</span>,
    width: "130px",
  },
  {
    key: "location",
    header: "Location",
    sortable: true,
    editable: true,
    type: "text",
    width: "120px",
  },
  {
    key: "isActive",
    header: "Active",
    sortable: true,
    editable: true,
    type: "boolean",
    width: "80px",
    align: "center",
  },
];

const productColumns: Column<Product>[] = [
  {
    key: "name",
    header: "Product",
    sortable: true,
    editable: true,
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground">{row.category}</div>
      </div>
    ),
    width: "200px",
  },
  {
    key: "price",
    header: "Price",
    sortable: true,
    editable: true,
    type: "number",
    render: (value) => (
      <span className="font-mono font-medium">${value?.toLocaleString()}</span>
    ),
    align: "right",
    width: "100px",
  },
  {
    key: "stock",
    header: "Stock",
    sortable: true,
    editable: true,
    type: "number",
    render: (value, row) => (
      <div className="text-right">
        <div className="font-mono">{value}</div>
        <div
          className={`text-xs ${
            row.status === "out_of_stock"
              ? "text-red-600"
              : row.status === "low_stock"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {row.status.replace("_", " ")}
        </div>
      </div>
    ),
    align: "right",
    width: "100px",
  },
  {
    key: "rating",
    header: "Rating",
    sortable: true,
    render: (value, row) => (
      <div className="text-center">
        <div className="font-mono">{value}★</div>
        <div className="text-xs text-muted-foreground">({row.reviews})</div>
      </div>
    ),
    align: "center",
    width: "100px",
  },
  {
    key: "supplier",
    header: "Supplier",
    sortable: true,
    editable: true,
    type: "text",
    width: "120px",
  },
  {
    key: "featured",
    header: "Featured",
    sortable: true,
    editable: true,
    type: "boolean",
    width: "80px",
    align: "center",
  },
  {
    key: "updatedAt",
    header: "Updated",
    sortable: true,
    type: "date",
    render: (value) => <span className="text-sm font-mono">{value}</span>,
    width: "120px",
  },
];

const taskColumns: Column<Task>[] = [
  {
    key: "title",
    header: "Task",
    sortable: true,
    editable: true,
    render: (value, row) => (
      <div>
        <div className="font-medium">{value}</div>
        <div className="text-sm text-muted-foreground truncate max-w-xs">
          {row.description}
        </div>
      </div>
    ),
    width: "300px",
  },
  {
    key: "priority",
    header: "Priority",
    sortable: true,
    editable: true,
    type: "select",
    options: [
      { label: "Low", value: "low" },
      { label: "Medium", value: "medium" },
      { label: "High", value: "high" },
      { label: "Urgent", value: "urgent" },
    ],
    render: (value) => (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value === "urgent"
            ? "bg-red-100 text-red-800"
            : value === "high"
            ? "bg-orange-100 text-orange-800"
            : value === "medium"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {value}
      </span>
    ),
    width: "100px",
  },
  {
    key: "status",
    header: "Status",
    sortable: true,
    editable: true,
    type: "select",
    options: [
      { label: "To Do", value: "todo" },
      { label: "In Progress", value: "in_progress" },
      { label: "Review", value: "review" },
      { label: "Completed", value: "completed" },
    ],
    render: (value) => (
      <span
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          value === "completed"
            ? "bg-green-100 text-green-800"
            : value === "in_progress"
            ? "bg-blue-100 text-blue-800"
            : value === "review"
            ? "bg-purple-100 text-purple-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {String(value).replace("_", " ")}
      </span>
    ),
    width: "120px",
  },
  {
    key: "assignee",
    header: "Assignee",
    sortable: true,
    editable: true,
    type: "text",
    width: "140px",
  },
  {
    key: "dueDate",
    header: "Due Date",
    sortable: true,
    editable: true,
    type: "date",
    render: (value) => {
      const date = new Date(String(value));
      const now = new Date();
      const isOverdue = date < now;
      const isDueSoon =
        date.getTime() - now.getTime() < 3 * 24 * 60 * 60 * 1000;

      return (
        <span
          className={`font-mono text-sm ${
            isOverdue
              ? "text-red-600"
              : isDueSoon
              ? "text-yellow-600"
              : "text-foreground"
          }`}
        >
          {String(value)}
        </span>
      );
    },
    width: "120px",
  },
  {
    key: "estimatedHours",
    header: "Est. Hours",
    sortable: true,
    editable: true,
    type: "number",
    render: (value) => <span className="font-mono">{value}h</span>,
    align: "right",
    width: "100px",
  },
  {
    key: "project",
    header: "Project",
    sortable: true,
    editable: true,
    type: "text",
    width: "140px",
  },
];

// Row actions
const userActions: RowAction<User>[] = [
  {
    key: "view",
    label: "View Profile",
    icon: <Eye className="w-4 h-4" />,
    onClick: (row) => alert(`Viewing profile for ${row.name}`),
  },
  {
    key: "edit",
    label: "Edit User",
    icon: <Edit2 className="w-4 h-4" />,
    onClick: (row) => alert(`Editing user ${row.name}`),
  },
  {
    key: "email",
    label: "Send Email",
    icon: <Mail className="w-4 h-4" />,
    onClick: (row) => window.open(`mailto:${row.email}`),
  },
  {
    key: "delete",
    label: "Delete User",
    icon: <Trash2 className="w-4 h-4" />,
    variant: "destructive",
    onClick: (row) => alert(`Delete user ${row.name}?`),
    disabled: (row) => row.role === "admin",
  },
];

const productActions: RowAction<Product>[] = [
  {
    key: "view",
    label: "View Details",
    icon: <Eye className="w-4 h-4" />,
    onClick: (row) => alert(`Viewing product ${row.name}`),
  },
  {
    key: "edit",
    label: "Edit Product",
    icon: <Edit2 className="w-4 h-4" />,
    onClick: (row) => alert(`Editing product ${row.name}`),
  },
  {
    key: "delete",
    label: "Delete Product",
    icon: <Trash2 className="w-4 h-4" />,
    variant: "destructive",
    onClick: (row) => alert(`Delete product ${row.name}?`),
  },
];

// Story configuration
const meta: Meta<typeof DataTable> = {
  title: "Organisms/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A comprehensive, accessible, and performant table component with advanced features.",
      },
    },
  },
  argTypes: {
    data: {
      description: "Array of data objects to display",
      control: false,
    },
    columns: {
      description: "Column definitions",
      control: false,
    },
    sorting: {
      description: "Sorting configuration",
      control: "object",
    },
    search: {
      description: "Search configuration",
      control: "object",
    },
    pagination: {
      description: "Pagination configuration",
      control: "object",
    },
    selection: {
      description: "Row selection configuration",
      control: "object",
    },
    filtering: {
      description: "Filtering configuration",
      control: "object",
    },
    editing: {
      description: "Inline editing configuration",
      control: "object",
    },
    compact: {
      description: "Whether to use compact styling",
      control: "boolean",
    },
    striped: {
      description: "Whether to show striped rows",
      control: "boolean",
    },
    bordered: {
      description: "Whether to show borders",
      control: "boolean",
    },
    hoverable: {
      description: "Whether to show hover effects",
      control: "boolean",
    },
  },
};

export default meta;

type UserStory = StoryObj<DataTableProps<User>>;
type ProductStory = StoryObj<DataTableProps<Product>>;
type TaskStory = StoryObj<DataTableProps<Task>>;
type Story = UserStory;

// Basic Stories
export const Basic: Story = {
  args: {
    data: sampleUsers.slice(0, 5),
    columns: userColumns.slice(0, 4),
    hoverable: true,
    striped: false,
    bordered: false,
  },
};

export const Compact: Story = {
  args: {
    data: sampleUsers.slice(0, 10),
    columns: userColumns.slice(0, 5),
    compact: true,
    striped: true,
    bordered: true,
  },
};

// Feature Stories
export const WithSorting: Story = {
  args: {
    data: sampleUsers.slice(0, 20),
    columns: userColumns,
    sorting: {
      enabled: true,
      defaultSort: { key: "name", direction: "asc" },
    },
    hoverable: true,
  },
};

export const WithSearch: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    search: {
      enabled: true,
      query: "",
      placeholder: "Search users by name, email, or department...",
      debounceMs: 300,
    },
    hoverable: true,
  },
};

export const SearchableTable: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    search: {
      enabled: true,
      query: "",
      placeholder: "Search users by name, email, or department...",
      debounceMs: 300,
    },
    sorting: {
      enabled: true,
      defaultSort: { key: "name", direction: "asc" },
    },
    pagination: {
      enabled: true,
      currentPage: 1,
      pageSize: 10,
      totalItems: sampleUsers.length,
      pageSizeOptions: [5, 10, 25, 50],
      showPageSizeSelector: true,
      showPaginationInfo: true,
    },
    hoverable: true,
    striped: true,
  },
};

export const WithPagination: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    return (
      <DataTable
        {...args}
        pagination={{
          enabled: true,
          currentPage,
          pageSize,
          totalItems: sampleUsers.length,
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize,
          pageSizeOptions: [5, 10, 25, 50],
          showPageSizeSelector: true,
          showPaginationInfo: true,
        }}
      />
    );
  },
  args: {
    data: sampleUsers,
    columns: userColumns,
    hoverable: true,
  },
};


export const WithSelection: Story = {
  render: (args) => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [data] = useState(sampleUsers);

    return (
      <div className="space-y-4">
        <div className="text-sm text-muted-foreground">
          Selected: {selectedRows.length} users
        </div>
        <DataTable
          {...args}
          data={data}
          selection={{
            enabled: true,
            selectedRows,
            onSelectionChange: setSelectedRows,
            mode: "multiple",
          }}
          getRowKey={(row) => row.id}
        />
      </div>
    );
  },
  args: {
    columns: userColumns,
    hoverable: true,
  },
};



export const WithFiltering: Story = {
  args: {
    data: sampleUsers,
    columns: userColumns,
    search: {
      enabled: true,
      query: "",
      placeholder: "Search users...",
    },
    filtering: {
      enabled: true,
      filters: {},
      maxColumnFilters: 2,
    },
    hoverable: true,
  },
};

export const WithInlineEditing: Story = {
  render: (args) => {
    const [data, setData] = useState(sampleUsers.slice(0, 20));

    const handleRowUpdate = useCallback((updatedRow: User, index: number) => {
      setData((prev) => prev.map((row, i) => (i === index ? updatedRow : row)));
    }, []);

    return (
      <DataTable
        {...args}
        data={data}
        editing={{
          enabled: true,
          editingRowIndex: null,
          editingRowData: null,
          onRowUpdate: handleRowUpdate,
        }}
      />
    );
  },
  args: {
    columns: userColumns,
    hoverable: true,
  },
};

export const WithActions: Story = {
  args: {
    data: sampleUsers.slice(0, 20),
    columns: userColumns,
    rowActions: userActions,
    hoverable: true,
  },
};

export const WithLoadingState: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: {
      isLoading: true,
      loadingMessage: "Loading users...",
      spinnerType: "default",
    },
  },
};

export const WithSkeletonLoading: Story = {
  args: {
    data: [],
    columns: userColumns,
    loading: {
      isLoading: true,
      loadingMessage: "Loading users...",
      spinnerType: "dots",
    },
  },
};

export const WithEmptyState: Story = {
  args: {
    data: [],
    columns: userColumns,
    emptyState: {
      message: "No users found",
      icon: <Mail className="w-12 h-12 text-muted-foreground" />,
      action: {
        label: "Add User",
        onClick: () => alert("Add user clicked"),
      },
    },
  },
};

// Comprehensive Examples
export const CompleteUserManagement: Story = {
  render: (args) => {
    const [data, setData] = useState(sampleUsers);
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleRowUpdate = useCallback((updatedRow: User, index: number) => {
      setData((prev) => prev.map((row, i) => (i === index ? updatedRow : row)));
    }, []);

    const handleSearch = useCallback((query: string) => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, []);

    const bulkActions =
      selectedRows.length > 0 ? (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => alert(`Exporting ${selectedRows.length} users`)}
          >
            <Download className="w-4 h-4 mr-2" />
            Export ({selectedRows.length})
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => {
              if (confirm(`Delete ${selectedRows.length} users?`)) {
                setData((prev) =>
                  prev.filter((row) => !selectedRows.includes(row))
                );
                setSelectedRows([]);
              }
            }}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete ({selectedRows.length})
          </Button>
        </div>
      ) : null;

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">User Management</h2>
          <Button onClick={() => alert("Add user")}>Add User</Button>
        </div>

        <DataTable
          {...args}
          data={data}
          selection={{
            enabled: true,
            selectedRows,
            mode: "multiple",
            onSelectionChange: setSelectedRows,
          }}
          search={{
            enabled: true,
            query: "",
            placeholder: "Search users by name, email, or department...",
            onSearch: handleSearch,
          }}
          filtering={{
            enabled: true,
            filters: {},
            maxColumnFilters: 3,
          }}
          editing={{
            enabled: true,
            editingRowIndex: null,
            editingRowData: null,
            onRowUpdate: handleRowUpdate,
          }}
          pagination={{
            enabled: true,
            currentPage: 1,
            pageSize: 15,
            totalItems: data.length,
            pageSizeOptions: [10, 15, 25, 50],
            showPageSizeSelector: true,
            showPaginationInfo: true,
          }}
          sorting={{
            enabled: true,
            defaultSort: { key: "name", direction: "asc" },
          }}
          loading={{
            isLoading,
            loadingMessage: "Searching users...",
          }}
          rowActions={[
            ...userActions,
            {
              key: "bulk-action",
              label: "Bulk Actions",
              icon: bulkActions,
              onClick: () => {},
            },
          ]}
        />
      </div>
    );
  },
  args: {
    columns: userColumns,
    hoverable: true,
    striped: false,
    bordered: false,
  },
};

export const ProductCatalog: ProductStory = {
  render: (args) => {
    const [data, setData] = useState(sampleProducts);
    const [selectedRows, setSelectedRows] = useState<Product[]>([]);

    const handleRowUpdate = useCallback(
      (updatedRow: Product, index: number) => {
        setData((prev) =>
          prev.map((row, i) => (i === index ? updatedRow : row))
        );
      },
      []
    );

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Product Catalog</h2>
          <Button onClick={() => alert("Add product")}>Add Product</Button>
        </div>

        <DataTable
          {...args}
          data={data}
          selection={{
            enabled: true,
            selectedRows,
            mode: "multiple",
            onSelectionChange: setSelectedRows,
          }}
          search={{
            enabled: true,
            query: "",
            placeholder: "Search products...",
          }}
          filtering={{
            enabled: true,
            filters: {},
            maxColumnFilters: 2,
          }}
          editing={{
            enabled: true,
            editingRowIndex: null,
            editingRowData: null,
            onRowUpdate: handleRowUpdate,
          }}
          pagination={{
            enabled: true,
            currentPage: 1,
            pageSize: 20,
            totalItems: data.length,
            pageSizeOptions: [10, 20, 50, 100],
            showPageSizeSelector: true,
            showPaginationInfo: true,
          }}
          sorting={{
            enabled: true,
            defaultSort: { key: "name", direction: "asc" },
          }}
          rowActions={productActions}
        />
      </div>
    );
  },
  args: {
    columns: productColumns,
    hoverable: true,
    striped: false,
    bordered: false,
  },
};

export const TaskManagement: TaskStory = {
  render: () => {
    const [data, setData] = useState(sampleTasks);
    const [selectedRows, setSelectedRows] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [filters, setFilters] = useState<Record<string, any>>({});

    const handleRowUpdate = useCallback((updatedRow: Task, index: number) => {
      setData((prev) =>
        prev.map((row, i) => (i === index ? updatedRow : row))
      );
    }, []);

    const paginatedData = useMemo(() => {
      const start = (currentPage - 1) * pageSize;
      return data.slice(start, start + pageSize);
    }, [data, currentPage, pageSize]);

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Task Management</h2>
          <Button onClick={() => alert("Create task")}>Create Task</Button>
        </div>

        <DataTable
          data={paginatedData}
          columns={taskColumns}
          selection={{
            enabled: true,
            selectedRows,
            mode: "multiple",
            onSelectionChange: setSelectedRows,
          }}
          search={{
            enabled: true,
            query: "",
            placeholder: "Search tasks...",
          }}
          filtering={{
            enabled: true,
            filters,
            maxColumnFilters: 2,
          }}
          editing={{
            enabled: true,
            editingRowIndex: null,
            editingRowData: null,
            onRowUpdate: handleRowUpdate,
          }}
          pagination={{
            enabled: true,
            currentPage,
            pageSize,
            totalItems: data.length,
            onPageChange: setCurrentPage,
            onPageSizeChange: setPageSize,
            pageSizeOptions: [10, 15, 25, 50],
            showPageSizeSelector: true,
            showPaginationInfo: true,
          }}
          sorting={{
            enabled: true,
            defaultSort: { key: "priority", direction: "desc" },
          }}
          rowActions={[
            {
              key: "view",
              label: "View Task",
              icon: <Eye className="w-4 h-4" />,
              onClick: (row) => alert(`Viewing task ${row.title}`),
            },
            {
              key: "edit",
              label: "Edit Task",
              icon: <Edit2 className="w-4 h-4" />,
              onClick: (row) => alert(`Editing task ${row.title}`),
            },
            {
              key: "delete",
              label: "Delete Task",
              icon: <Trash2 className="w-4 h-4" />,
              variant: "destructive",
              onClick: (row) => alert(`Delete task ${row.title}?`),
            },
          ]}
          hoverable={true}
          striped={false}
          bordered={false}
        />
      </div>
    );
  },
};

