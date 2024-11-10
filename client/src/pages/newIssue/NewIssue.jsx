import React from 'react'
import Sidebar from '../../components/Sidebar'
import NewIssueForm from '../../components/NewIssueForm'

const NewIssue = () => {
    return (
        <div className='h-screen w-screen flex'>
            <Sidebar />
            <div className='h-full w-4/5 bg-[#A1EEC5] flex justify-center'></div>
            <NewIssueForm />
        </div>
    )
}
  
export default NewIssue