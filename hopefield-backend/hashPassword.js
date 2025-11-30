import bcrypt from "bcrypt";

const password = "H0peBeG1n$"; // replace with your real admin password

const generateHash = async () => {
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed password:", hash);
};

generateHash();
