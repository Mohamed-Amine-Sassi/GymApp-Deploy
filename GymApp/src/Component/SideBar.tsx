import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";

function SideBarComponent() {
  return (
    <div className="h-full bg-gray-900 border-r border-gray-700">
      <Sidebar
        backgroundColor="#111827"
        rootStyles={{
          color: "#f3f4f6",
          height: "100%",
          border: "none",
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-orange-500 font-bold text-lg tracking-wider">
            DREAM GYM
          </h1>
          <p className="text-gray-400 text-xs mt-1 font-mono">
            v2.1.7 CLASSIFIED
          </p>
        </div>

        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              backgroundColor: active ? "#ea580c" : "transparent",
              color: active ? "#ffffff" : "#d1d5db",
              fontWeight: active ? "bold" : "normal",
              fontSize: "14px",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              padding: "12px 24px",
              margin: "4px 8px",
              borderRadius: "4px",
              border: active ? "1px solid #fb923c" : "1px solid transparent",
              fontFamily: "monospace",
              "&:hover": {
                backgroundColor: "#374151",
                color: "#fb923c",
                border: "1px solid #6b7280",
              },
            }),
            subMenuContent: {
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "4px",
              margin: "4px 8px",
            },
            label: ({ open }) => ({
              color: open ? "#fb923c" : "#d1d5db",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              fontSize: "14px",
            }),
          }}
        >
          {/* Command Center - Active */}
          {/* <MenuItem
            active={true}
            icon={<span className="text-orange-500">⬛</span>}
          >
            Command Center
          </MenuItem>

          <MenuItem icon={<span className="text-gray-400">👥</span>}>
            Agent Network
          </MenuItem>

          <MenuItem icon={<span className="text-gray-400">⚙️</span>}>
            Operations
          </MenuItem> */}

          {/* Members SubMenu */}
          <SubMenu
            label="Member Management"
            icon={<span className="text-gray-400">🔍</span>}
          >
            <MenuItem
              component={<Link to="/add_member" />}
              style={{
                backgroundColor: "#1f2937",
                color: "#d1d5db",
                fontSize: "12px",
                padding: "8px 32px",
              }}
            >
              → Add Member
            </MenuItem>
            <MenuItem
              component={<Link to="/get_member" />}
              style={{
                backgroundColor: "#1f2937",
                color: "#d1d5db",
                fontSize: "12px",
                padding: "8px 32px",
              }}
            >
              → All Members
            </MenuItem>
            <MenuItem
              component={<Link to="/get_ended_member" />}
              style={{
                backgroundColor: "#1f2937",
                color: "#d1d5db",
                fontSize: "12px",
                padding: "8px 32px",
              }}
            >
              → Ended Subs
            </MenuItem>
          </SubMenu>

          {/* Systems */}
          <MenuItem icon={<span className="text-gray-400">⚡</span>}>
            Systems
          </MenuItem>
        </Menu>

        {/* Status Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400 text-xs font-mono">
              SYSTEM ONLINE
            </span>
          </div>
          <div className="text-gray-500 text-xs font-mono mt-1">
            From: 8:00AM
          </div>
          <div className="text-gray-500 text-xs font-mono">To: 17:00PM</div>
        </div>
      </Sidebar>
    </div>
  );
}

export default SideBarComponent;
