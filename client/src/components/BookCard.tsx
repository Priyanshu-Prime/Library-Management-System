interface BookCardProps {
  name: string;
  author: string;
  image: string;
}

const BookCard = ({ name, author, image }: BookCardProps) => {
  return (
    <div className="w-44 h-60 ml-4 mt-4 rounded-lg bg-[#64CF7BDE] flex flex-col items-center justify-center text-ellipsis">
      <div className="w-full h-5/7 flex justify-center items-center">
        <img src={image} className="w-4/5 h-4/5 object-contain"></img>
      </div>
      <div className="w-full h-2/7 pl-2 pb-4 text-ellipsis">
        <div className="text-l h-1/2 font-semibold text-ellipsis truncate">
          {name}
        </div>
        <div className="text-m h-1/2 text-ellipsis truncate">{author}</div>
      </div>
    </div>
  );
};

export default BookCard;
