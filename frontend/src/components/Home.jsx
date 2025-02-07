import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">ยินดีต้อนรับ!</h1>
        <p className="text-gray-600 mb-8">
          โปรดเข้าสู่ระบบหรือลงทะเบียนเพื่อดำเนินการต่อ
        </p>

        <div className="flex flex-col gap-4">
          <Link to="/login">
            <button className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              เข้าสู่ระบบ
            </button>
          </Link>

          <Link to="/register">
            <button className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
              ลงทะเบียน
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
