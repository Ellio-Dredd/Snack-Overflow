import bcrypt from 'bcrypt'; // If using ES modules
// const bcrypt = require('bcrypt'); // If using CommonJS

const runTest = async () => {
  const rawPassword = '123'; // The password the user entered

  // Generate a new hash for the raw password
  const newHash = await bcrypt.hash(rawPassword, 10);
  console.log("Newly generated hash: ", newHash);

  const storedHash = '$2b$10$SKjP8sWD2sRIga2UdUCcJ.icQicedeuYRmf4WBBOLjX.wWvuKfoEy'; // The one from MongoDB
  
  // Compare the password with the hash
  const isMatch = await bcrypt.compare(rawPassword, storedHash);

  if (isMatch) {
    console.log('✅ Password matches the stored hash.');
  } else {
    console.log('❌ Password does NOT match the stored hash.');
  }
};

runTest();
