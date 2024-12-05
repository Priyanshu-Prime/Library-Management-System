import { Link } from 'react-router-dom';

interface SidebarRowProps {
  redirectUrl: string;
  row_content: string;
}

const SidebarRow = ({ redirectUrl, row_content }: SidebarRowProps) => {
  const handleClick = () => {
    console.log(redirectUrl);
  };

  return (
    <Link to={'/' + redirectUrl}>
      <button
        onClick={handleClick}
        className='w-full h-14 bg-[#D9D9D926] text-center content-center text-l font-normal'
      >
        {row_content}
      </button>
    </Link>
  );
};

export default SidebarRow;
