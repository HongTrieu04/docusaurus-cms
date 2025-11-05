# Docusaurus Admin with Automatic Folder Creation

This is a custom admin interface for Docusaurus that automatically creates documentation folders when new navbar items are added.

## Features

- **Automatic Folder Creation**: When you add a new navbar item with an internal path (e.g., `/docs/intro`), the system automatically creates a corresponding folder in the `docs` directory.
- **Auto-generated Content**: Each new folder contains an `index.md` file with proper frontmatter and default content.
- **Sidebar Integration**: New folders are automatically added to the sidebar configuration.
- **User-friendly Interface**: Custom widget provides clear feedback about the folder creation process.

## How It Works

### 1. Adding New Navbar Items

When editing the navbar in the admin interface:

1. Add a new item to the navbar list
2. Fill in the "Label" field (required)
3. Fill in the "Path" field with an internal path (e.g., `/docs/my-new-section`)
4. Save the changes

### 2. Automatic Process

The system will automatically:

1. **Create Folder**: Creates a folder named `my-new-section` in the `docs` directory
2. **Create Index File**: Generates an `index.md` file with:
   - Proper frontmatter (title, sidebar label, position)
   - Default content explaining the section
3. **Update Sidebar**: Modifies `sidebars.js` to include the new folder

### 3. Manual Trigger

If needed, you can manually trigger the folder creation process:

1. Click the "Kiểm tra và tạo thư mục" button in the custom widget
2. The system will check for new navbar items and create missing folders

## File Structure

```
static/admin/
├── config.yml              # Decap CMS configuration
├── package.json            # Dependencies
├── src/
│   └── components/
│       └── NavbarFolderWidget.js  # Custom widget for folder creation
├── netlify/functions/
│   └── update-navbar-folders/
│       └── index.js        # Netlify function for folder creation
└── scripts/
    └── update-navbar-folders.js    # Local script for testing
```

## Configuration

### Decap CMS Settings

The admin interface is configured in `config.yml` with:

- Custom widget for folder creation
- Hidden field to enable/disable automatic folder creation
- Proper validation for navbar items

### Netlify Functions

The automatic folder creation is handled by a Netlify function at `/.netlify/functions/update-navbar-folders`.

## Testing

### Local Development

1. Navigate to the admin directory:
   ```bash
   cd static/admin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the local development server:
   ```bash
   npm start
   ```

4. Test the folder creation script locally:
   ```bash
   node scripts/update-navbar-folders.js
   ```

### Netlify Deployment

The system works automatically in production:

1. When navbar.json is updated via the admin interface
2. The Netlify function triggers and creates the necessary folders
3. The sidebar configuration is updated automatically

## Troubleshooting

### Common Issues

1. **Folders not being created**:
   - Ensure the navbar item has both a label and a path
   - Check that the path starts with `/docs/`
   - Verify the Netlify function is deployed correctly

2. **Sidebar not updating**:
   - Check that the `sidebars.js` file exists
   - Ensure the function has write permissions for the file
   - Look for syntax errors in the sidebar configuration

3. **Permission errors**:
   - Ensure the Netlify function has write access to the `docs` directory
   - Check file permissions on the repository

### Debug Mode

To enable debug logging:

1. Set the environment variable `DEBUG=*` in Netlify
2. Check the function logs in the Netlify dashboard
3. Look for console output in the browser's developer tools

## Contributing

1. Make your changes in the appropriate files
2. Test locally using the development server
3. Deploy changes to test the production environment
4. Submit a pull request with detailed changes

## License

MIT License - see the LICENSE file for details.