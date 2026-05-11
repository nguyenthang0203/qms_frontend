import apiClient from '../../core/apiClient';

export const qfService = {
  // Lấy danh sách tiêu chuẩn: GET /api/v1/qf/standards/
  getStandards: async (page = 1, pageSize = 20) => {
    const res = await apiClient.get('/qf/standards/', {
      params: { page, page_size: pageSize },
    });
    return res.data; // { items: [...], total: n, ... }
  },

  // Lấy danh sách tiêu chí: GET /api/v1/qf/criteria/
  getCriteria: async (standardId = null, page = 1, pageSize = 100) => {
    const params = { page, page_size: pageSize };
    if (standardId) params.standard_id = standardId;
    const res = await apiClient.get('/qf/criterias/', { params });
    return res.data; // { items: [...], total: n, ... }
  },
};
