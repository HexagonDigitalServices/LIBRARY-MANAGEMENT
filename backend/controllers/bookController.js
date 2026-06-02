const getLocalIsoDate = (value = new Date()) => {
  const d = new Date(value);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const getStartOfDay = (value) => new Date(new Date(value).setHours(0, 0, 0, 0));

const getDiffInDays = (targetDateString) => 
  Math.round((getStartOfDay(targetDateString) - getStartOfDay(new Date())) / 86400000);

const getOverdueUnits = (overdueDays, interval) => {
  if (overdueDays <= 0) return 0;
  const divisor = { week: 7, month: 30, year: 365 }[interval] || 1;
  return Math.ceil(overdueDays / divisor);
};

const calculateFine = (issue, fineRate = 10, fineInterval = "day") => {
  if (!issue || issue.fineCleared || issue.returnedOn) return 0;
  const overdueDays = Math.max(0, -getDiffInDays(issue.dueDate));
  return getOverdueUnits(overdueDays, fineInterval) * fineRate + (Number(issue.manualFine) || 0);
};


    const createdIssues = await Promise.all(validBooks.map(book => Issue.create({
      source: "manual",
      bookCode: book.bookCode.trim(),
      title: book.title.trim(),
      userEmail: student.email,
      userName: student.name,
      issuedOn: todayIso,
      dueDate: book.dueDate,
      returnedOn: null,
      fineRate: Number(book.fineRate ?? req.body.fineRate ?? 10),
      fineInterval: book.fineInterval ?? req.body.fineInterval ?? "day",
      manualFine: 0,
      fineCleared: false,
      clearedFineAmount: 0,
      department: studentDetails.department?.trim() || student.department || "General",
      stream: studentDetails.stream?.trim() || student.stream || "General",
      year: studentDetails.academicYear?.trim() || student.year || "1st Year",
      semester: studentDetails.semester?.trim() || student.semester || "Semester 1",
      rollNumber: studentDetails.rollNumber?.trim() || student.rollNo || "Not assigned",
      studentId: student.rollNo || `ST-${student._id.toString().slice(-4)}`
    })));
