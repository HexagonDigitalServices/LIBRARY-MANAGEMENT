  useEffect(() => {
    if (location.state?.signupEmail || location.state?.signupPassword) {
      setForm((current) => ({
        ...current,
        email: location.state?.signupEmail ?? "",
        password: location.state?.signupPassword ?? "",
      }));
    }
  }, [location.state]);


      console.log("Login successful, navigating to dashboard...");
      await new Promise((resolve) => setTimeout(resolve, 100));
      setLoading(false);

      const fallbackPath =
        form.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
      let target = location.state?.from || fallbackPath;

      if (
        form.role === "user" &&
        typeof target === "string" &&
        target.startsWith("/admin")
      ) {
        console.warn(
          "Login: preventing navigation to admin route for student; using fallback",
        );
        target = fallbackPath;
      } else if (
        form.role === "admin" &&
        typeof target === "string" &&
        target.startsWith("/user")
      ) {
        console.warn(
          "Login: preventing navigation to user route for admin; using fallback",
        );
        target = fallbackPath;
      }

      console.log("Navigating to:", target);
      navigate(target, { replace: true });
    