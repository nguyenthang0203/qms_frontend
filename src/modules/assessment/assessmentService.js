import apiClient from '../../core/apiClient';

export const assessmentService = {
  // --- QUẢN LÝ CHU KỲ (Nằm trong org/cycles) ---
  getCycles: async (page = 1, pageSize = 20) => {
    const res = await apiClient.get('/org/cycles/', {
      params: { page, page_size: pageSize },
    });
    return res.data;
  },

  // --- QUẢN LÝ PHIẾU ĐÁNH GIÁ (Nằm trong assessment/forms) ---
  getForms: async (cycleId, page = 1, pageSize = 50) => {
    const res = await apiClient.get('/assessment/forms/', {
      params: { cycle_id: cycleId, page, page_size: pageSize },
    });
    return res.data;
  },
};
