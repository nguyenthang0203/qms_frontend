import apiClient from '../../core/apiClient';

export const evidenceService = {
  // Lấy danh sách minh chứng
  getEvidenceItems: async (page = 1, pageSize = 20, cycleId = null) => {
    const params = { page, page_size: pageSize };
    if (cycleId) params.cycle_id = cycleId;
    const res = await apiClient.get('/evidence/items/', { params });
    return res.data;
  },
};
