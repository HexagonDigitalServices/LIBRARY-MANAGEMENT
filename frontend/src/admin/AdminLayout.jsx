const navItems = [
  {
    label: "Admin Dashboard",
    description: "Library office analytics",
    href: "/admin/dashboard",
    match: "/admin/dashboard",
    icon: "dashboard",
  },
  {
    label: "Books Page",
    description: "Inventory, fines, and returns",
    href: "/admin/books",
    match: "/admin/books",
    icon: "books",
  },
  {
    label: "Users Page",
    description: "Student-wise issue history",
    href: "/admin/users",
    match: "/admin/users",
    icon: "users",
  },
  {
    label: "Fine Page",
    description: "Overdue fine rules and settings",
    href: "/admin/fines",
    match: "/admin/fines",
    icon: "alerts",
  },
];

const footerItems = currentUser
  ? [
      {
        label: "Logout",
        icon: "login",
        kind: "primary",
        action: () => {
          logout();
          navigate("/login");
        },
      },
    ]
  : [];
