import { Input } from './ui/input';

interface InventoryTopBarProps {
  onSearch?: (searchTerm: string) => void;
}

const InventoryTopBar = ({ onSearch }: InventoryTopBarProps) => {
  return (
    <div className='w-full flex justify-end items-center p-3'>
      {/* <SearchBar onSearch={onSearch} /> */}
      <Input onSearch={onSearch} className={'w-40 border-slate-500 focus-visible:ring-slate-700'} />
    </div>
  );
};

export default InventoryTopBar;
