import Sidebar from '../../components/Sidebar';

const AdminDashboard = () => {
  return (
    <div className='h-screen w-screen flex'>
      <Sidebar />
      <div className='h-full w-4/5 bg-[#A1EEC5] flex justify-center'>
        {/* <ReadingImg /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
