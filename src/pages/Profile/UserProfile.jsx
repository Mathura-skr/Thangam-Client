import { useState } from "react";
import Sidebar from "../../components/UserProfile/Sidebar";
import ProfileForm from "../../components/UserProfile/ProfileForm";
import AddressManager from "../../components/UserProfile/AddressManager";
import OrderHistory from "../../components/UserProfile/OrderHistory";
import Navigation from "../../components/Navbar/Navigation";
import { useMediaQuery } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import { Drawer } from "@mui/material";

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("profile");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileForm />;
      case "addresses":
        return <AddressManager />;
      case "orders":
        return <OrderHistory />;
      default:
        return null;
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation />

      <div className="container mx-auto p-4">
        {/* Mobile Sidebar Toggle Button */}
        {isMobile && (
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-2 mb-4 p-2 bg-white rounded shadow-sm"
          >
            <FiMenu className="text-lg" />
            <span>Menu</span>
          </button>
        )}

        <div className="flex flex-col md:flex-row gap-4">
          {/* Desktop Sidebar */}
          {!isMobile && (
            <div className="w-full md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
                <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
              </div>
            </div>
          )}

          {/* Mobile Drawer */}
          {isMobile && (
            <Drawer
              anchor="left"
              open={mobileSidebarOpen}
              onClose={() => setMobileSidebarOpen(false)}
            >
              <div className="w-64 p-4">
                <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
              </div>
            </Drawer>
          )}

          {/* Main Content */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}