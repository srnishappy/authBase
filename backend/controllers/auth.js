const prisma = require('../prisma/prisma'); // นำเข้า Prisma Client
const bcrypt = require('bcrypt'); // นำเข้า bcrypt สำหรับการเข้ารหัสรหัสผ่าน
const jwt = require('jsonwebtoken');
// ฟังก์ชั่นสำหรับการสมัครสมาชิก
exports.register = async (req, res) => {
  // ดึงข้อมูลจาก body ของ request
  const { email, username, password } = req.body;

  try {
    // ✅ ตรวจสอบว่ามีข้อมูลครบหรือไม่
    if (!email) return res.status(400).json({ msg: 'Invalid Email' }); // ถ้าไม่มี email
    if (!username) return res.status(400).json({ msg: 'Invalid Username' }); // ถ้าไม่มี username
    if (!password) return res.status(400).json({ msg: 'Invalid Password' }); // ถ้าไม่มี password

    // ✅ เช็คว่ามี email หรือ username ซ้ำหรือไม่
    const checkUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }], // เช็คทั้ง email หรือ username ซ้ำ
      },
    });

    if (checkUser) {
      return res.status(409).json({ msg: 'Email or Username already exists' }); // ถ้ามีซ้ำ
    }

    // ✅ เข้ารหัสรหัสผ่านก่อนบันทึกลงฐานข้อมูล
    const salt = await bcrypt.genSalt(10); // สร้าง salt สำหรับการเข้ารหัส
    const hashPassword = await bcrypt.hash(password, salt); // เข้ารหัสรหัสผ่าน
    console.log(hashPassword); // แสดงรหัสผ่านที่ถูกเข้ารหัส

    // ✅ บันทึกข้อมูลผู้ใช้ใหม่ลงในฐานข้อมูล
    const newUser = await prisma.user.create({
      data: {
        email: email, // บันทึก email
        username: username, // บันทึก username
        password: hashPassword, // บันทึกรหัสผ่านที่ถูกเข้ารหัส
      },
      select: {
        email: true,
        username: true,
      },
    });

    // ✅ ตอบกลับ client ว่าการสมัครสมาชิกสำเร็จ
    res.status(201).json({ message: 'Register success', user: newUser });
  } catch (err) {
    // ✅ หากเกิดข้อผิดพลาด จะตอบกลับข้อผิดพลาด
    console.error(err); // แสดงข้อผิดพลาดใน console
    res.status(500).json({ msg: 'Error registering user' }); // ส่งข้อความผิดพลาดกลับไป
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body; // ใช้แค่ username กับ password
    if (!username) return res.status(400).json({ msg: 'Invalid Username' }); // ถ้าไม่มี username
    if (!password) return res.status(400).json({ msg: 'Invalid Password' }); // ถ้าไม่มี password

    // ค้นหาผู้ใช้โดยใช้ username แทน email
    const user = await prisma.user.findFirst({
      where: {
        username: username, // ค้นหาด้วย username เท่านั้น
      },
    });

    if (!user) return res.status(400).json({ msg: 'ไม่พบชื่อผู้ใข้' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'รหัสผ่านไม่ตรงกัน' });

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email, // ยังคงเก็บ email ไว้ใน payload หากต้องการ
        role: user.role,
      },
    };

    const token = jwt.sign(payload, 'srnishappy', { expiresIn: '1d' });

    res.json({
      user: payload.user,
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
