import React from 'react';
import CMS, { Cms } from 'decap-cms-app';

// 1. IMPORT CÁC WIDGET TÙY CHỈNH CỦA BẠN
import CollectionSelectControl from '@site/src/components/CollectionSelectWidget';
import NavbarFolderControl from '@site/src/components/NavbarFolderWidget';

// 2. ĐĂNG KÝ (REGISTER) CÁC WIDGET
// Tên đăng ký phải khớp với tên bạn dùng trong config.yml
CMS.registerWidget('collectionSelectWidget', CollectionSelectControl);
CMS.registerWidget('navbarFolderWidget', NavbarFolderControl);

// 3. XUẤT RA COMPONENT TRANG ADMIN
export default function AdminPage() {
  // === GIẢI PHÁP SỬA LỖI CACHE ===
  // Chúng ta KHÔNG import 'config.yml' ở đây nữa.
  // Bằng cách render <Cms /> mà không có prop 'config',
  // Decap CMS sẽ tự động 'fetch' (tải) file /admin/config.yml "sống"
  // (file 'auth_type: device' bạn vừa sửa ở Bước 4)
  return (
    <Cms />
  );
}