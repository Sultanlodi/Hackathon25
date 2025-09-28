import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { User, Mail, Edit2, Save, X, Camera, Shield } from "lucide-react";
import { toast } from "sonner";

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    joinDate: "September 2024",
    accountStatus: "verified"
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card variant="glass">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your personal account information and preferences
              </CardDescription>
            </div>
          </div>
          
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={handleEdit}>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Profile Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-8 h-8 text-primary" />
            </div>
            {isEditing && (
              <Button
                size="sm"
                variant="outline"
                className="absolute -bottom-2 -right-2 h-8 w-8 p-0 rounded-full bg-card border-2"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <div className="space-y-1">
            <h3 className="font-semibold">{profileData.name}</h3>
            <div className="flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className={`text-xs ${
                  profileData.accountStatus === "verified" 
                    ? "bg-success/10 text-success border-success/20" 
                    : "bg-warning/10 text-warning border-warning/20"
                }`}
              >
                <Shield className="w-3 h-3 mr-1" />
                {profileData.accountStatus === "verified" ? "Verified Account" : "Unverified"}
              </Badge>
            </div>
            <p className="text-sm text-foreground-muted">
              Member since {profileData.joinDate}
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-md bg-background-subtle border border-border-subtle">
                <User className="w-4 h-4 text-foreground-muted" />
                <span>{profileData.name}</span>
              </div>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email address"
              />
            ) : (
              <div className="flex items-center gap-2 p-3 rounded-md bg-background-subtle border border-border-subtle">
                <Mail className="w-4 h-4 text-foreground-muted" />
                <span>{profileData.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Account Statistics */}
        {!isEditing && (
          <div className="pt-4 border-t border-border-subtle">
            <h4 className="font-medium mb-3">Account Overview</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-lg bg-background-subtle">
                <div className="text-lg font-semibold text-primary">5</div>
                <div className="text-xs text-foreground-muted">Goals Created</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background-subtle">
                <div className="text-lg font-semibold text-success">$2,250</div>
                <div className="text-xs text-foreground-muted">Total Saved</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background-subtle">
                <div className="text-lg font-semibold text-warning">125</div>
                <div className="text-xs text-foreground-muted">WLY Tokens</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-background-subtle">
                <div className="text-lg font-semibold text-primary">3</div>
                <div className="text-xs text-foreground-muted">Milestones</div>
              </div>
            </div>
          </div>
        )}

        {/* Data Privacy Note */}
        <div className="p-4 rounded-lg bg-info/5 border border-info/20">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
            <div className="space-y-1">
              <h4 className="text-sm font-medium text-info">Privacy Protected</h4>
              <p className="text-xs text-foreground-subtle">
                Your personal information is encrypted and never shared with third parties. 
                We use bank-grade security to protect your data.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}