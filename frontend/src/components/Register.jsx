import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setFrom] = useState({
    email: '',
    username: '',
    password: '',
    confirmpassword: '',
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmpassword) {
      return toast.error('รหัสผ่านไม่ตรงกัน');
    }

    try {
      const response = await axios.post(
        'http://localhost:3000/api/register',
        form
      );
      toast.success('สมัครสมาชิกสำเร็จ!');
      // เมื่อสมัครสำเร็จให้ไปหน้า login
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error('ชื่อผู้ใช้งานหรืออีเมลนี้ถูกใช้ไปแล้ว');
      } else {
        toast.error('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">ลงทะเบียน</h2>
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
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              อีเมล
            </label>
            <input
              type="email"
              name="email"
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

          <div className="mb-6">
            <label
              htmlFor="confirmpassword"
              className="block text-sm font-medium text-gray-700"
            >
              ยืนยันรหัสผ่าน
            </label>
            <input
              type="password"
              name="confirmpassword"
              onChange={handleOnChange}
              className="w-full p-2 mt-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            ลงทะเบียน
          </button>
        </form>
      </div>

      {/* ToastContainer ใช้แสดงผล Toast */}
      <ToastContainer />
    </div>
  );
};

export default Register;
