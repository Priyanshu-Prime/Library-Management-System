// import Sidebar from '../../components/Sidebar';
import Sidebar from '@/components/UserSideBar';
import InventoryTopBar from '../../components/InventoryTopBar';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import moment from 'moment';

const PORT = import.meta.env.VITE_SERVER_PORT;

const AccountInfo = () => {
  const [uid, setUID] = useState<string>('');
  useEffect(() => {
    const id = localStorage.getItem('uid');
    if (id) setUID(id);
  }, []);

  interface Students {
    roll_no: string;
    name: string;
    email: string;
    contact: string;
  }

  interface Book {
    name: string;
  }

  interface Issues {
    book_id: string;
    student_id: number;
    date_of_issue: Date;
    date_of_return: Date;
    returned: Boolean;
    book: Book;
  }

  const [students, setStudents] = useState<Students[]>([]);
  const [issues, setIssues] = useState<Issues[]>([]);

  const fetchStudents = async () => {
    const url = `http://localhost:${PORT}/api/students/${uid}`;

    try {
      const response = await axios.get(url);
      setStudents(response.data);
      console.log(students);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIssues = async () => {
    const url = `http://localhost:${PORT}/api/issues/student/${uid}`;

    try {
      const response = await axios.get(url);
      setIssues(response.data);
      console.log(issues);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (uid) fetchStudents();
  }, [uid]);

  useEffect(() => {
    if (uid) fetchIssues();
  }, [uid]);

  return (
    <Sidebar>
      <div className='h-full w-full bg-[#A1EEC5] flex flex-col overflow-y-auto'>
        <InventoryTopBar />
        {students.length > 0 ? (
          <div className='h-5/6 w-full'>
            {students.map((student) => (
              <div
                key={student.roll_no}
                className='p-4 rounded justify-between items-center'
              >
                <h3 className='text-lg font-bold '>{student.name}</h3>
                <p className='text-stone-950'>Student ID: {student.roll_no}</p>
                <p className='text-stone-950'>Student Email: {student.email}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No students available.</p>
        )}
        {issues.length > 0 ? (
          <div className='h-5/6 w-full'>
            {issues.map((issue) => (
              <div
                key={issue.book_id}
                className='p-4 flex rounded shadow justify-between items-center'
              >
                <div className='w-1/2 text-center'>
                  <h3 className='text-md font-bold'>{issue.book.name}</h3>
                </div>
                <div className='w-1/6 text-center'>
                  <p className=' text-md text-gray-700'>
                    Date of Issue:{' '}
                    {moment(issue.date_of_issue).format('DD-MM-YYYY')}
                  </p>
                  <p className='text-md text-gray-700'>
                    Date of Return:{' '}
                    {moment(issue.date_of_return).format('DD-MM-YYYY')}
                  </p>
                </div>
                <div className='w-1/3 text-center'>
                  <p className='text-md text-gray-700'>
                    Status: {issue.returned ? 'Returned' : 'Not Returned'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No issues available.</p>
        )}
      </div>
    </Sidebar>
  );
};

export default AccountInfo;
