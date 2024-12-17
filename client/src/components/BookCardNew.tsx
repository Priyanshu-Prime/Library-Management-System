import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  interface BookCardProps {
    name: string;
    author: string;
    image: string;
  }
  
  const BookCardNew = ({ name, author, image }: BookCardProps) => {
    return (
      <Card className="bg-[] w-full max-w-xs m-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardContent className="p-0">
          <img
            src={image}
            alt={`${name} cover`}
            className="w-full h-52 object-cover rounded-t-lg"
          />
        </CardContent>
        <CardHeader className="p-4">
          <CardTitle className="text-lg font-bold text-gray-800">{name}</CardTitle>
          <CardDescription className="text-sm text-gray-500">{author}</CardDescription>
        </CardHeader>
      </Card>
    );
  };
  
  export default BookCardNew;
  