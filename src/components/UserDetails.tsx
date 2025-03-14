
import { useState, useEffect } from 'react';
import { getUserInfo, saveUserInfo } from '@/utils/localStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { User, Edit2, Save } from 'lucide-react';
import { toast } from 'sonner';

const UserDetails = () => {
  const [userInfo, setUserInfo] = useState<{name: string, phone: string, address: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({
    name: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const info = getUserInfo();
    setUserInfo(info);
    if (info) {
      setEditedInfo({
        name: info.name,
        phone: info.phone,
        address: info.address
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!editedInfo.name || !editedInfo.phone || !editedInfo.address) {
      toast.error("Please fill all fields");
      return;
    }

    // Save to localStorage
    saveUserInfo({
      name: editedInfo.name,
      phone: editedInfo.phone,
      address: editedInfo.address
    });

    // Update state
    setUserInfo(editedInfo);
    setIsEditing(false);
    toast.success("Your details have been updated");
  };

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
          {userInfo && !isEditing ? (
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
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4" 
                onClick={() => setIsEditing(true)}
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit Details
              </Button>
            </div>
          ) : userInfo && isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={editedInfo.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={editedInfo.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={editedInfo.address}
                  onChange={handleChange}
                  placeholder="Your delivery address"
                  className="resize-none min-h-[100px]"
                />
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsEditing(false);
                    // Reset to original values
                    if (userInfo) {
                      setEditedInfo({
                        name: userInfo.name,
                        phone: userInfo.phone,
                        address: userInfo.address
                      });
                    }
                  }}
                >
                  Cancel
                </Button>
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
