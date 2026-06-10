  const { currentUser } = useAuth();
  const { currentUserHistory, currentUserSummary } = useLibrary();

  const activeCount = currentUserHistory.filter(
    (item) => item.liveStatus === "Borrowed",
  ).length;
  const overdueCount = currentUserHistory.filter(
    (item) => item.liveStatus === "Overdue",
  ).length;
  const pendingFine = currentUserSummary?.totalFine ?? 0;
  const clearedFine = currentUserSummary?.totalClearedFine ?? 0;

  const overviewStats = [
    {
      key: "issues",
      label: "Total Issues",
      value: `${currentUserHistory.length}`,
      note: "All library records attached to your student account",
      icon: BookCopy,
    },
    {
      key: "borrowed",
      label: "Active Books",
      value: `${activeCount}`,
      note: "Books currently mapped to your profile",
      icon: GraduationCap,
    },
    {
      key: "overdue",
      label: "Overdue Books",
      value: `${overdueCount}`,
      note: "Needs follow-up before more penalties are added",
      icon: AlertTriangle,
    },
    {
      key: "pending-fine",
      label: "Pending Fine",
      value: `Rs. ${pendingFine}`,
      note: "Fine amount still pending on active records",
      icon: ReceiptText,
    },
    {
      key: "cleared-fine",
      label: "Fine Cleared",
      value: `Rs. ${clearedFine}`,
      note: "Total fine amount already cleared on your account",
      icon: ReceiptText,
    },
  ];