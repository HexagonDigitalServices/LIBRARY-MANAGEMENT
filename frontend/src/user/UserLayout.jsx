const navItems = [
  {
    label: "Student Dashboard",
    description: "Your college library overview",
    href: "/user/dashboard",
    match: "/user/dashboard",
    icon: "dashboard",
  },
  {
    label: "Books Page",
    description: "Issued books, fines, and due dates",
    href: "/user/books",
    match: "/user/books",
    icon: "books",
  },
  {
    label: "Edit Profile",
    description: "Update your student information",
    href: "/user/profile",
    match: "/user/profile",
    icon: "users",
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