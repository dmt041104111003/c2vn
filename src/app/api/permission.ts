

export const PERMISSIONS = [
  { action: 'user:create', description: 'Tạo người dùng mới' },
  { action: 'user:read', description: 'Xem danh sách người dùng' },
  { action: 'user:update', description: 'Cập nhật thông tin người dùng' },
  { action: 'user:delete', description: 'Xóa người dùng' },
  { action: 'user:assignRole', description: 'Gán vai trò cho người dùng' },

  { action: 'post:create', description: 'Tạo bài viết mới' },
  { action: 'post:read', description: 'Xem danh sách bài viết' },
  { action: 'post:update', description: 'Cập nhật bài viết' },
  { action: 'post:delete', description: 'Xóa bài viết' },
  { action: 'post:publish', description: 'Xuất bản bài viết' },
  { action: 'post:unpublish', description: 'Gỡ bài viết khỏi xuất bản' },

  { action: 'moderation:approve_post', description: 'Duyệt bài viết' },
  { action: 'moderation:reject_post', description: 'Từ chối bài viết' },
  { action: 'moderation:hide_comment', description: 'Ẩn bình luận' },
  { action: 'moderation:delete_comment', description: 'Xóa bình luận vi phạm' },
  { action: 'moderation:ban_user', description: 'Cấm người dùng vi phạm' },
  { action: 'moderation:view_reports', description: 'Xem danh sách báo cáo vi phạm' },
]

export type PermissionAction = typeof PERMISSIONS[number]['action']
