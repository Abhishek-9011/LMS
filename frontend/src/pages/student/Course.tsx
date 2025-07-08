import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const Course = () => {
  return (
    <Card className="overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          className="w-full h-36  object-cover rounded-t-lg"
            src="https://miro.medium.com/v2/resize:fit:4800/format:webp/1*_bJ2z2NRfTncHAv5UjUxwA.jpeg"
          alt=""
        />
      </div>
      <CardContent className="px-5 py-4 space-y-3">
        <h1 className="hover:underline font-bold text-lg truncate">
          Next js compelete course
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h1 className="font-medium text-sm">Abhishek</h1>
          </div>
          <Badge className="bg-blue-600 text-white px-2 py-1 text-xs rounded-full">
            Advance
          </Badge>
        </div>
        <div className="text-lg font-bold">
          <span>₹499</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Course;
