/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { UserTable } from "~/components/admin/user/UserTable";
import { User } from "~/components/admin/type/type";
import * as XLSX from "xlsx";
import { ArrowDownToLine, Funnel, Plus, Search } from "lucide-react";


export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPerPage, setShowPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user");
      if (!res.ok) throw new Error("Failed to fetch users");
      const json = await res.json();

      const transformedUsers: User[] = json.data.map((user: User) => ({
        id: user.id,
        name: user.name || "Unknown",
        email: user.email,
        roles: user.roles?.map((r: any) => r.name) || ["USER"],
        status: "Active",
        createdAt: user.createdAt,
      }));

      setUsers(transformedUsers);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleExport = () => {
    const dataToExport = users.map((u) => ({
      ID: u.id,
      Name: u.name,
      Email: u.email,
      Roles: u.roles.join(", "),
      Status: u.status,
      CreatedAt: u.createdAt,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    XLSX.writeFile(workbook, "user_data.xlsx");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen">
      <main className="flex-1 ">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <select
              value={showPerPage}
              onChange={(e) => setShowPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>

            <button className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100" onClick={handleExport}>
              <ArrowDownToLine className="w-4 h-4" />
              Export
            </button>

            <button
              className="flex items-center gap-1 px-3 py-2 border rounded-md text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => alert("Filter logic chưa triển khai")}
            >
              <Funnel className="w-4 h-4" />
              Filter
            </button>

            <button className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
              <Plus className="w-4 h-4" />
              Add User
            </button>
          </div>
        </div>

        <UserTable users={filteredUsers.slice(0, showPerPage)} loading={loading} refreshData={fetchUsers} />
      </main>
    </div>
  );
}
