const Sidebar = ({ activeTab, setActiveTab }) => {
    const items = [
      { key: "profile", label: "Personal Info" },
      { key: "addresses", label: "Manage Addresses" },
      { key: "orders", label: "My Orders" },
    ];
  
    return (
      <div className="flex hidden md:block">
        <div className="bg-white rounded-2xl shadow-md p-4 space-y-2">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`block w-full text-left px-4 py-2 rounded-lg ${
                activeTab === item.key
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default Sidebar;