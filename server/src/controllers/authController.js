import userService from "../services/userService.js";
import sendMail from "../helpers/send.mail.js";
const bcrypt = require("bcryptjs");

const otpStore = new Map();
const verifiedOTP = new Set();

const sendResetOTP = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("req.body:", req.body);
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Email không tồn tại." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    const expiresAt = Date.now() + 1 * 60 * 1000;

    otpStore.set(email, { otp, expiresAt });

    await sendMail(
      email,
      "Mã OTP đặt lại mật khẩu - BookLovers",
      `
        <h3>Mã OTP của bạn: <strong>${otp}</strong></h3>
        <p>OTP có hiệu lực trong 1 phút.</p>
        <p>Không chia sẻ mã này cho bất kỳ ai.</p>
      `
    );

    res.status(200).json({ message: "Đã gửi OTP về email." });
  } catch (error) {
    console.error("Lỗi gửi OTP:", error.message, error.stack);
    res.status(500).json({ message: "Lỗi server khi gửi OTP." });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record || record.otp != otp) {
    return res.status(400).json({ message: "Mã OTP không chính xác." });
  }

  if (Date.now() > record.expiresAt) {
    otpStore.delete(email);
    return res.status(400).json({ message: "Mã OTP đã hết hạn." });
  }

  verifiedOTP.add(email);
  otpStore.delete(email);

  await new Promise((resolve) => setTimeout(resolve, 1500));
  return res.status(200).json({ message: "Xác thực OTP thành công." });
};

const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!verifiedOTP.has(email)) {
    return res.status(403).json({ message: "Bạn chưa xác thực OTP." });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await userService.updateUserPasswordByEmail(email, hashedPassword);

    verifiedOTP.delete(email);

    const subject = "Thông báo: Đổi mật khẩu thành công";
    const htmlContent = `
        <h3>Xin chào,</h3>
        <p>Bạn vừa thay đổi mật khẩu cho tài khoản của mình tại <strong>BookLovers</strong>.</p>
        <p>Nếu bạn không thực hiện hành động này, vui lòng liên hệ với chúng tôi ngay lập tức (<strong>0764513977</strong>).</p>
        <p>Trân trọng,<br/>Đội ngũ BookLovers</p>
      `;

    await sendMail(email, subject, htmlContent);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    return res.status(200).json({ message: "Đổi mật khẩu thành công." });
  } catch (err) {
    console.error("Lỗi khi đổi mật khẩu:", err.message);
    return res
      .status(500)
      .json({ message: "Đã xảy ra lỗi. Vui lòng thử lại sau." });
  }
};

export default {
  sendResetOTP,
  verifyOTP,
  resetPassword,
};
