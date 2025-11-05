import React from 'react';

export default function AdminPage() {
  return (
    <div>
      <h1>Admin Interface</h1>
      <div id="cms-root"></div>
      
      {/* Load Decap CMS from CDN */}
      <script 
        src="https://unpkg.com/decap-cms-app@3.2.0/dist/decap-cms-app.min.js"
        async
      />
      
      {/* Initialize CMS */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            if (typeof CMS !== 'undefined') {
              CMS.init({
                backend: {
                  name: 'github',
                  branch: 'main',
                  repo: 'HongTrieu04/docusaurus-cms'
                },
                media_folder: 'static/img/uploads',
                public_folder: '/img/uploads',
                collections: [
                  {
                    name: "blog",
                    label: "Bài viết (Blog)",
                    folder: "blog",
                    create: true,
                    extension: "md",
                    format: "frontmatter",
                    slug: "{{year}}-{{month}}-{{day}}-{{slug}}",
                    fields: [
                      { name: "title", label: "Tiêu đề", widget: "string", optional: true },
                      { name: "slug", label: "Slug (Đường dẫn)", widget: "string", optional: true },
                      { name: "body", label: "Nội dung", widget: "markdown" }
                    ]
                  },
                  {
                    name: "docs",
                    label: "Tài Liệu (Docs)",
                    folder: "docs",
                    create: true,
                    extension: "md",
                    format: "frontmatter",
                    slug: "{{slug}}",
                    nested: { depth: 5 },
                    fields: [
                      { name: "title", label: "Tiêu đề (Title)", widget: "string", optional: true },
                      { name: "sidebar_label", label: "Nhãn Sidebar", widget: "string", optional: true },
                      { name: "sidebar_position", label: "Vị trí Sidebar", widget: "number", value_type: 'int', optional: true },
                      { name: "body", label: "Nội dung", widget: "markdown" }
                    ]
                  },
                  {
                    name: "settings",
                    label: "Cài Đặt Trang",
                    editor: { preview: false },
                    files: [
                      {
                        label: "Thanh Điều Hướng (Navbar)",
                        name: "navbar",
                        file: "data/navbar.json",
                        fields: [
                          {
                            label: "Các mục trên Navbar",
                            name: "items",
                            widget: "list",
                            fields: [
                              { label: "Nhãn (Label)", name: "label", widget: "string", hint: "Tên hiển thị (bắt buộc)" },
                              { label: "Đường dẫn nội bộ (to)", name: "to", widget: "string", optional: true, hint: "Ví dụ: /blog, /docs/intro" },
                              { label: "Đường dẫn bên ngoài (href)", name: "href", widget: "string", optional: true, hint: "Ví dụ: https://google.com" },
                              { label: "Loại mục (type)", name: "type", widget: "string", optional: true, hint: "Chọn loại: 'docSidebar' cho tài liệu, 'external' cho link ngoài, để trống cho link thường" },
                              { label: "ID Sidebar", name: "sidebarId", widget: "string", optional: true, hint: "Chỉ dùng khi type='docSidebar'. Có sẵn: 'docs', 'blog', 'tutorialSidebar'. Xem sidebars.js để biết thêm ID." },
                              { label: "Vị trí (position)", name: "position", widget: "select", options: ["left", "right"], default: "left", optional: true, hint: "Vị trí hiển thị trên navbar" }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              });
            } else {
              console.error('Decap CMS failed to load');
            }
          });
        `
      }} />
    </div>
  );
}