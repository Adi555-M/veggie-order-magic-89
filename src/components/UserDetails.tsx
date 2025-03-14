
import { useState, useEffect } from 'react';
import { getUserInfo } from '@/utils/localStorage';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { User } from 'lucide-react';

const UserDetails = () => {
  const [userInfo, setUserInfo] = useState<{name: string, phone: string, address: string} | null>(null);

  useEffect(() => {
    const info = getUserInfo();
    setUserInfo(info);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
        >
          <User className="h-5 w-5" />
          {userInfo && (
            <span className="absolute -top-1 -right-1 bg-green-500 rounded-full w-3 h-3"></span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Details</SheetTitle>
          <SheetDescription>
            {userInfo ? 'Your saved delivery information' : 'No saved details found'}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {userInfo ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Name</h3>
                <p className="text-base">{userInfo.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p className="text-base">{userInfo.phone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Address</h3>
                <p className="text-base">{userInfo.address}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Your details will appear here after you place your first order. This helps you checkout faster next time.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default UserDetails;
