import { useState, useEffect, useRef } from 'react';
import { evidenceService } from '../evidenceService';
import { uploadFileToStorage } from '../uploadService';
import { FileText, Search, Filter, Upload, ExternalLink } from 'lucide-react';

const EvidencePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await evidenceService.getEvidenceItems();
        setItems(data.items || []);
      } catch (err) {
        console.error('Lỗi tải minh chứng:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    setUploadMessage(null);
    try {
      const res = await uploadFileToStorage(file);
      const info = res?.data ?? res;
      setUploadMessage({
        type: 'ok',
        text: `Đã tải lên: ${info?.original_filename ?? file.name} → ${info?.object_key ?? ''}`,
      });
    } catch (err) {
      setUploadMessage({
        type: 'err',
        text: err.response?.data?.message || err.message || 'Upload thất bại',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-primary-900">Kho Minh Chứng</h2>
        <div className="flex flex-col items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={handlePickFile}
            disabled={uploading}
            className="btn-primary inline-flex items-center disabled:opacity-60"
          >
            <Upload size={18} className="mr-2" /> {uploading ? 'Đang tải…' : 'Tải lên minh chứng'}
          </button>
          {uploadMessage && (
            <p
              className={
                uploadMessage.type === 'ok'
                  ? 'text-sm text-green-700 max-w-md text-right'
                  : 'text-sm text-red-600 max-w-md text-right'
              }
            >
              {uploadMessage.text}
            </p>
          )}
        </div>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 text-primary-500" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo mã hoặc tên minh chứng..." 
            className="w-full pl-10 pr-4 py-2 border border-primary-100 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
          />
        </div>
        <button className="bg-white border border-primary-100 px-4 py-2 rounded-lg flex items-center text-primary-700 hover:bg-primary-50 transition-colors">
          <Filter size={18} className="mr-2" /> Bộ lọc
        </button>
      </div>

      <div className="card-qms overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-primary-500">Đang tải danh sách minh chứng...</div>
        ) : items.length === 0 ? (
          <div className="p-12 text-center">
            <div className="p-4 bg-primary-50 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-primary-300">
              <FileText size={32} />
            </div>
            <p className="text-primary-600 font-medium">Chưa có minh chứng nào được lưu trữ.</p>
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary-50 border-b border-primary-100">
                <th className="p-4 text-xs font-bold text-primary-600 uppercase">Mã MC</th>
                <th className="p-4 text-xs font-bold text-primary-600 uppercase">Tên Minh chứng</th>
                <th className="p-4 text-xs font-bold text-primary-600 uppercase">Loại</th>
                <th className="p-4 text-xs font-bold text-primary-600 uppercase">Trạng thái</th>
                <th className="p-4 text-xs font-bold text-primary-600 uppercase text-right">Xem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary-100">
              {items.map((item) => (
                <tr key={item.evidence_id} className="hover:bg-primary-50 transition-colors group">
                  <td className="p-4 font-mono text-xs font-bold text-primary-600">{item.evidence_code}</td>
                  <td className="p-4">
                    <div className="text-sm font-medium text-primary-800">{item.name}</div>
                    <div className="text-[10px] text-primary-500">Ngày cập nhật: {new Date(item.updated_at).toLocaleDateString()}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-primary-700">{item.evidence_type}</span>
                  </td>
                  <td className="p-4">
                    <span className="bg-primary-50 text-primary-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-primary-100">
                      {item.approval_status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-primary-500 hover:text-primary-600">
                      <ExternalLink size={18} />
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

export default EvidencePage;
