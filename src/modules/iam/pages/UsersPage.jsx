import React, { useState, useEffect } from 'react';
import { iamService } from '../iamService';
import { UserPlus, Mail, ShieldCheck, Lock, Unlock } from 'lucide-react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await iamService.getUsers();
        setUsers(data.items || []);
      } catch (err) {
        console.error('Lỗi tải người dùng:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-800">Quản lý Người dùng</h2>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 flex items-center shadow-sm">
          <UserPlus size={18} className="mr-2" /> Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Đang tải danh sách...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Họ tên & Email</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Username</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase">Trạng thái</th>
                <th className="p-4 text-xs font-bold text-slate-500 uppercase text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((user) => (
                <tr key={user.user_id} className="hover:bg-slate-50 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm">
                        {user.full_name?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-700">{user.full_name || 'N/A'}</div>
                        <div className="text-xs text-slate-500 flex items-center">
                          <Mail size={12} className="mr-1" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded text-slate-600">
                      @{user.username}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      user.is_active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {user.is_active ? 'Đang hoạt động' : 'Tạm khóa'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-primary-600 transition-colors p-2">
                      <ShieldCheck size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-red-600 transition-colors p-2">
                      {user.is_locked ? <Lock size={18} /> : <Unlock size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
