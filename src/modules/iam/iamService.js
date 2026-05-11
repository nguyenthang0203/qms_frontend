import apiClient from '../../core/apiClient';

export const iamService = {
  // Lấy danh sách người dùng
  getUsers: async (page = 1, pageSize = 20) => {
    const res = await apiClient.get('/iam/users/', {
      params: { page, page_size: pageSize },
    });
    return res.data;
  },
};
