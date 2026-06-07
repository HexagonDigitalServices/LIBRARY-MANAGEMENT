const stepList = [
  { id: 1, title: "Account" },
  { id: 2, title: "OTP" },
  { id: 3, title: "Profile" },
];

const signupHighlights = [
  "Step 1 collects student account details and checks immediately if the email already exists.",
  "Step 2 verifies the OTP before moving forward.",
  "Step 3 saves department, stream, semester, year, and roll number.",
];

const demoOtp = "2468";


  const { registerStudent, verifyOtpCode, completeProfileData, logout } =
    useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
    role: "user",
    department: "",
    stream: "",
    semester: "Semester 1",
    academicYear: "1st Year",
    rollNumber: "",
  });

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(timer);
  }, [toast]);

  const validateStepOne = () => {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.password.trim()
    ) {
      setError("Please fill name, email, mobile number, and password first.");
      return false;
    }
    if (form.phone.trim().replace(/\D/g, "").length !== 10) {
      setError("Mobile number must be exactly 10 digits.");
      return false;
    }
    return true;
  };

  const validateStepThree = () => {
    if (
      !form.department.trim() ||
      !form.stream.trim() ||
      !form.semester.trim() ||
      !form.academicYear.trim() ||
      !form.rollNumber.trim()
    ) {
      setError(
        "Please complete department, stream, semester, year, and roll number."
      );
      return false;
    }
    return true;
  };

  const showToast = (message, tone = "success") => {
    setToast({ message, tone });
  };

  const goNext = async () => {
    setError("");

    if (step === 1) {
      if (!validateStepOne()) return;
      setLoading(true);
      const res = await registerStudent({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setLoading(false);
      if (!res.ok) {
        showToast(res.error, "error");
        setError(res.error);
        return;
      }
      showToast("OTP sent to your email successfully!");
    }

    if (step === 2) {
      if (!form.otp.trim()) {
        setError("Please enter the 6-digit OTP code sent to your email.");
        return;
      }
      setLoading(true);
      const res = await verifyOtpCode({
        email: form.email,
        otp: form.otp,
      });
      setLoading(false);
      if (!res.ok) {
        showToast(res.error, "error");
        setError(res.error);
        return;
      }
      showToast("OTP verified successfully!");
    }

    setStep((current) => Math.min(3, current + 1));
  };

  const goBack = () => {
    setError("");
    setStep((current) => Math.max(1, current - 1));
  };



              {step === 2 && (
                <>
                  <div className={s.otpInfoBox}>
                    <p className={s.otpInfoLabel}>Verification Sent</p>
                    <p className={s.otpInfoText}>
                      We have sent a 6-digit OTP verification code to{" "}
                      <span className={s.emailHighlight}>{form.email}</span>.
                      Please check your inbox and enter the code below to verify
                      your account.
                    </p>
                  </div>

                  <label className="block">
                    <span className={s.fieldLabel}>
                      <KeyRound size={15} />
                      OTP Verification
                    </span>
                    <input
                      name="otp"
                      type="text"
                      value={form.otp}
                      onChange={handleChange}
                      placeholder="Enter 6-digit OTP"
                      className={s.input}
                    />
                  </label>
                </>
              )}

              {step === 3 && (
                <>
                  <label className="block">
                    <span className={s.fieldLabelBlock}>Department</span>
                    <input
                      name="department"
                      type="text"
                      value={form.department}
                      onChange={handleChange}
                      placeholder="Write your department"
                      className={s.input}
                    />
                  </label>

                  <label className="block">
                    <span className={s.fieldLabelBlock}>Stream</span>
                    <input
                      name="stream"
                      type="text"
                      value={form.stream}
                      onChange={handleChange}
                      placeholder="Write your stream"
                      className={s.input}
                    />
                  </label>

                  <div className={s.twoColumnGrid}>
                    <label className="block">
                      <span className={s.fieldLabelBlock}>Semester</span>
                      <select
                        name="semester"
                        value={form.semester}
                        onChange={handleChange}
                        className={s.select}
                      >
                        {studentSemesters.map((semester) => (
                          <option key={semester} value={semester}>
                            {semester}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="block">
                      <span className={s.fieldLabelBlock}>Year</span>
                      <select
                        name="academicYear"
                        value={form.academicYear}
                        onChange={handleChange}
                        className={s.select}
                      >
                        {studentYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className={s.fieldLabelBlock}>Roll Number</span>
                    <input
                      name="rollNumber"
                      type="text"
                      value={form.rollNumber}
                      onChange={handleChange}
                      placeholder="Write your roll number"
                      className={s.input}
                    />
                  </label>
                </>
              )}