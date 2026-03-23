

export const register = async (req, res) => {
  try {
    res.send("Register route working");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Register error" });
  }
};

export const login = async (req, res) => {
  try {
    res.send("Login route working");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.send("Logout route working");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Logout error" });
  }
};
