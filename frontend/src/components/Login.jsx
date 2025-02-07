import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'; // เพิ่มการใช้งาน Link

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/login',
        form
      );

      toast.success('เข้าสู่ระบบสำเร็จ!');

      localStorage.setItem('token', response.data.token);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.msg || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      } else {
        toast.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อผู้ใช้
            </label>
            <input
              type="text"
              name="username"
              onChange={handleOnChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              รหัสผ่าน
            </label>
            <input
              type="password"
              name="password"
              onChange={handleOnChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* แนะนำให้ไปที่หน้า Register ถ้ายังไม่ได้สมัคร */}
        <div className="mt-4 text-center">
          <p>
            ยังไม่มีบัญชีใช่ไหม?{' '}
            <Link to="/register" className="text-blue-500">
              ลงทะเบียนที่นี่
            </Link>
          </p>
        </div>
      </div>

      {/* ToastContainer ใช้แสดงผล Toast */}
      <ToastContainer />
    </div>
  );
};

export default Login;
