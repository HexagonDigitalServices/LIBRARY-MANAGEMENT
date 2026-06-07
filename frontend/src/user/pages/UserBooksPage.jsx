const filteredIssuedBooks = useMemo(() => {
    return currentUserHistory.filter((record) => {
      const term = filters.search.toLowerCase();
      const matchesSearch =
        !filters.search ||
        record.title.toLowerCase().includes(term) ||
        record.author.toLowerCase().includes(term) ||
        record.bookCode.toLowerCase().includes(term) ||
        currentUser?.name?.toLowerCase().includes(term);

      const matchesStatus =
        filters.status === "All" || record.liveStatus === filters.status;

      return matchesSearch && matchesStatus;
    });
  }, [currentUser?.name, currentUserHistory, filters]);