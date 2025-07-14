import pool from "../config/connectDB.js";

const getAllUsers = async (limit, offset) => {
  const [rows] = await pool.query("SELECT * FROM users LIMIT ? OFFSET ?", [
    limit,
    offset,
  ]);
  const [countRows] = await pool.query("SELECT COUNT(*) as total FROM users");

  return {
    users: rows,
    total: countRows[0].total,
  };
};

const getUserById = async (id) => {
  const [rows] = await pool.query(
    "SELECT id, email, fullname, avatar FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

const getUserAddresses = async (userId) => {
  const [rows] = await pool.query(
    "SELECT id, phone, address, is_default FROM user_addresses WHERE user_id = ?",
    [userId]
  );
  return rows;
};

// Thêm user mới
const createUser = async (userData) => {
  const { email, password, fullname, role, avatar } = userData;

  const [result] = await pool.query(
    `INSERT INTO users (email, password, fullname,role,avatar)
     VALUES (?, ?, ?, ?, ?)`,
    [email, password, fullname, role, avatar]
  );

  const insertedId = result.insertId;
  return await getUserById(insertedId);
};

// Cập nhật user
const updateUser = async (id, updateData) => {
  const { username, email, password, role } = updateData;

  await pool.query(
    `UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?`,
    [username, email, password, role, id]
  );

  return await getUserById(id);
};

const updateUserPasswordByEmail = async (email, hashedPassword) => {
  await pool.query(`UPDATE users SET password = ? WHERE email = ?`, [
    hashedPassword,
    email,
  ]);

  return true;
};

// Xóa user
const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) return null;

  await pool.query("DELETE FROM users WHERE id = ?", [id]);
  return user;
};

const getUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0] || null;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  updateUserPasswordByEmail,
  getUserAddresses,
};
