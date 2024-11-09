import { Button } from '@/components/ui/button';
import Headers from './Headers';
import { Input } from '@/components/ui/input';
import { Menu, Search} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from 'react-router-dom';

export default function Blog() {
  return (
    <>
      <Headers />

      <section className="w-full h-fit py-10">
        {/* Main Title Section */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900">Discover the Best Blogs</h1>
          <p className="mt-3 text-lg text-gray-600">
            Delve into articles that provide valuable insights and inspiration.
          </p>
        </div>

        {/* Settings Button */}
        <div className="flex justify-center mt-10">
          <Button className="bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700">
            <Sheet>
              <SheetTrigger className="flex items-center">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent className="p-6">
                <SheetHeader>
                  <SheetTitle className="text-xl font-semibold mb-4">Quick Access</SheetTitle>
                  <ul className="space-y-2">
                    <li className="text-md text-gray-800 hover:text-blue-600 transition-colors">
                      <Link to='/post'>Post</Link>
                    </li>
                    <li className="text-md text-gray-800 hover:text-blue-600 transition-colors">
                      <Link to='/dashboard'>Dashboard</Link>
                    </li>
                    <li className="text-md text-gray-800 hover:text-blue-600 transition-colors">
                      <Link to='/allblogs'>All Blogs</Link>
                    </li>
                  </ul>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </Button>
        </div>

        {/* Search Section */}
        <div className="flex flex-col items-center mt-12 space-y-4">
          <Input
            className="w-full max-w-md py-3 px-4 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for blogs..."
            type="search"
          />
          <Button className="bg-blue-600 text-white rounded-lg py-2 px-4 shadow-md hover:bg-blue-700 flex items-center">
            <Search className="w-5 h-5 mr-2" />
            Search
          </Button>
        </div>
      </section>
    </>
  );
}