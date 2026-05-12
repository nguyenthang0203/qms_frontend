import apiClient from '../../core/apiClient';

export const orgService = {
  /** GET /api/v1/org/health — kiểm tra backend & module tổ chức */
  health: async () => {
    const body = await apiClient.get('/org/health');
    return body;
  },
};
