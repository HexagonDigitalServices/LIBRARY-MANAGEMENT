  useEffect(() => {
    if (!currentUser) return;

    setForm({
      name: currentUser.name ?? "",
      email: currentUser.email ?? "",
      phone: currentUser.phone ?? "",
      department: currentUser.department ?? "",
      stream: currentUser.stream ?? "",
      semester: currentUser.semester ?? "",
      academicYear: currentUser.academicYear ?? "",
      rollNumber: currentUser.rollNumber ?? "",
    });
    setIsEditing(false);
    setError("");
  }, [currentUser]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(""), 2400);
    return () => clearTimeout(timer);
  }, [toast]);

          {isEditing && (
            <div className={s.buttonGroup}>
              <button
                type="submit"
                disabled={loading}
                className={s.saveButton}
              >
                {loading ? "Saving Profile..." : "Save Profile"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setError("");
                  setIsEditing(false);
                  setForm({
                    name: currentUser.name ?? "",
                    email: currentUser.email ?? "",
                    phone: currentUser.phone ?? "",
                    department: currentUser.department ?? "",
                    stream: currentUser.stream ?? "",
                    semester: currentUser.semester ?? "",
                    academicYear: currentUser.academicYear ?? "",
                    rollNumber: currentUser.rollNumber ?? "",
                  });
                }}
                disabled={loading}
                className={s.cancelButton}
              >
                Cancel
              </button>
            </div>
          )}
      