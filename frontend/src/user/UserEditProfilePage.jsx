  const { currentUser, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    stream: "",
    semester: "",
    academicYear: "",
    rollNumber: "",
  });
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setError("");
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setForm((current) => ({ ...current, [name]: digitsOnly }));
    } else {
      setForm((current) => ({ ...current, [name]: value }));
    }
  };


   <form className={s.formContainer} onSubmit={handleSubmit}>
          <label className={s.label}>
            <span className={s.labelSpan}>Name</span>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              disabled={!isEditing}
              className={s.input}
            />
          </label>

          <label className={s.label}>
            <span className={s.labelSpan}>Email</span>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={true}
              className={s.inputDisabled}
            />
            <span className={s.helperText}>
              Email address cannot be changed.
            </span>
          </label>

          <label className={s.label}>
            <span className={s.labelSpan}>Mobile Number</span>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className={s.input}
            />
          </label>

          <label className={s.label}>
            <span className={s.labelSpan}>Department</span>
            <input
              name="department"
              value={form.department}
              onChange={handleChange}
              disabled={!isEditing}
              className={s.input}
            />
          </label>

          <label className={s.label}>
            <span className={s.labelSpan}>Stream</span>
            <input
              name="stream"
              value={form.stream}
              onChange={handleChange}
              disabled={!isEditing}
              className={s.input}
            />
          </label>

          <label className={s.label}>
            <span className={s.labelSpan}>Semester</span>
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              disabled={!isEditing}
              className={s.select}
            >
              {studentSemesters.map((semester) => (
                <option key={semester} value={semester}>
                  {semester}
                </option>
              ))}
            </select>
          </label>

          <label className={s.label}>
            <span className={s.labelSpan}>Year</span>
            <select
              name="academicYear"
              value={form.academicYear}
              onChange={handleChange}
              disabled={!isEditing}
              className={s.select}
            >
              {studentYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>

          <label className={s.label}>
            <span className={s.labelSpan}>Roll Number</span>
            <input
              name="rollNumber"
              value={form.rollNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className={s.input}
            />
          </label>

          {error && <div className={s.errorMessage}>{error}</div>}

          {isEditing && (
            <div className={s.buttonGroup}>
              <button type="submit" disabled={loading} className={s.saveButton}>
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
        </form>