import bcrypt from "bcrypt";

const password = "H0peBeG1n$"; // replace with your real admin password
const password2 = "H0peAdm1n$";

const generateHash = async () => {
  const hash = await bcrypt.hash(password, 10);
  const hash2 = await bcrypt.hash(password2, 10);
  console.log("Hashed password:", hash);
  console.log("Hashed password 2:", hash2);
};

generateHash();
