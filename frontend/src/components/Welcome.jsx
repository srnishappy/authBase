import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (!storedUsername) {
      navigate('/login');
    } else {
      setUsername(storedUsername);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-semibold text-center text-gray-900">
          🎉 ยินดีต้อนรับ, {username}!
        </h1>
        <p className="mt-2 text-center text-gray-500">
          คุณสามารถตั้งค่าข้อมูลโปรไฟล์ของคุณได้ที่นี่
        </p>

        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={() => navigate('/setprofile')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-400 focus:outline-none"
          >
            ตั้งค่าโปรไฟล์
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              localStorage.removeItem('username');
              navigate('/login');
            }}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-400 focus:outline-none"
          >
            ออกจากระบบ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
