
      return {
        studentName: student.name,
        studentId: student.studentId,
        email: student.email,
        department: student.department,
        totalFine: student.totalFine,
        borrowedCount: student.borrowedCount,
        ...topOverdueRecord,
      };
