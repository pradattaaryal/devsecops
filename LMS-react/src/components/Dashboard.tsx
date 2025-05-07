import { useAuth } from "../context/AuthContext";
import { useNavigate, Outlet, NavLink } from "react-router-dom";
import { Book, User, Users, RepeatIcon, FileText, Settings, LogOut } from "lucide-react";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#1B4965] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6">
          <h1 className="text-2xl font-bold">HSMSS LIBRARY</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <Settings className="mr-3 h-5 w-5" />
            <span>Dashboard</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/author"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <User className="mr-3 h-5 w-5" />
            <span>Author</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/books"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <Book className="mr-3 h-5 w-5" />
            <span>Books</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/students"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <Users className="mr-3 h-5 w-5" />
            <span>Students</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/transaction"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <RepeatIcon className="mr-3 h-5 w-5" />
            <span>Transaction</span>
          </NavLink>
          
          <NavLink
            to="/dashboard/issuing"
            className={({ isActive }) =>
              `flex items-center p-4 ${isActive ? "bg-[#2C5F7C] border-l-4 border-white" : "hover:bg-[#2C5F7C]"}`
            }
          >
            <FileText className="mr-3 h-5 w-5" />
            <span>Issuing</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 w-full hover:bg-[#2C5F7C] rounded"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Log Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white p-4 shadow-sm flex justify-end">
          <div className="flex items-center">
            <User className="h-6 w-6 text-[#1B4965] mr-2" />
            <div>
              <div className="font-medium">{user || "Admin Name"}</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard