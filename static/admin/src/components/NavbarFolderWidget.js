import React from 'react';
import PropTypes from 'prop-types';

class NavbarFolderWidget extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.object,
    forName: PropTypes.string,
    classNameWrapper: PropTypes.string,
    setActiveStyle: PropTypes.func,
    setInactiveStyle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      createdFolders: []
    };
  }

  componentDidMount() {
    // Check if we have any recently created folders
    this.checkCreatedFolders();
  }

  checkCreatedFolders = async () => {
    try {
      // This would typically call a Netlify function to check for recently created folders
      // For now, we'll just show a placeholder
      const response = await fetch('/.netlify/functions/update-navbar-folders');
      const data = await response.json();
      
      if (data.createdFolders && data.createdFolders.length > 0) {
        this.setState({ createdFolders: data.createdFolders });
      }
    } catch (error) {
      console.log('Could not check created folders:', error);
    }
  };

  handleCreateFolder = () => {
    const { value } = this.props;
    
    // Trigger the folder creation process
    fetch('/.netlify/functions/update-navbar-folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ navbarData: value })
    })
    .then(response => response.json())
    .then(data => {
      if (data.createdFolders) {
        this.setState({ createdFolders: data.createdFolders });
      }
    })
    .catch(error => {
      console.error('Error creating folders:', error);
      alert('Đã xảy ra lỗi khi tạo thư mục. Vui lòng thử lại.');
    });
  };

  render() {
    const { classNameWrapper, setActiveStyle, setInactiveStyle } = this.props;
    const { showInfo, createdFolders } = this.state;

    return (
      <div className={classNameWrapper}>
        <div 
          className="navbar-folder-widget"
          onMouseEnter={setActiveStyle}
          onMouseLeave={setInactiveStyle}
        >
          <div className="widget-header">
            <h3>Tự động tạo thư mục tài liệu</h3>
            <button 
              type="button"
              className="info-button"
              onClick={() => this.setState({ showInfo: !showInfo })}
            >
              ℹ️
            </button>
          </div>
          
          {showInfo && (
            <div className="widget-info">
              <p>
                Khi bạn thêm một mục điều hướng mới với đường dẫn nội bộ (ví dụ: /docs/tên-mục-mới),
                hệ thống sẽ tự động tạo một thư mục tương ứng trong thư mục docs.
              </p>
              <p>
                Mỗi thư mục mới sẽ chứa một file index.md mặc định và được thêm vào sidebar tự động.
              </p>
            </div>
          )}
          
          {createdFolders.length > 0 && (
            <div className="created-folders">
              <h4>Thư mục vừa tạo:</h4>
              <ul>
                {createdFolders.map(folder => (
                  <li key={folder}>{folder}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button 
            type="button"
            className="create-folders-button"
            onClick={this.handleCreateFolder}
          >
            Kiểm tra và tạo thư mục
          </button>
        </div>
        
        <style jsx>{`
          .navbar-folder-widget {
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 15px;
            margin-top: 10px;
            background-color: #f9f9f9;
          }
          
          .widget-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
          
          .widget-header h3 {
            margin: 0;
            color: #333;
            font-size: 16px;
          }
          
          .info-button {
            background: none;
            border: none;
            cursor: pointer;
            font-size: 16px;
          }
          
          .widget-info {
            background-color: #e8f4f8;
            border: 1px solid #bee5eb;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 10px;
            font-size: 14px;
          }
          
          .widget-info p {
            margin: 0 0 8px 0;
          }
          
          .widget-info p:last-child {
            margin-bottom: 0;
          }
          
          .created-folders {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 10px;
          }
          
          .created-folders h4 {
            margin: 0 0 8px 0;
            color: #155724;
            font-size: 14px;
          }
          
          .created-folders ul {
            margin: 0;
            padding-left: 20px;
          }
          
          .created-folders li {
            margin-bottom: 4px;
            color: #155724;
          }
          
          .create-folders-button {
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            padding: 8px 16px;
            cursor: pointer;
            font-size: 14px;
            transition: background-color 0.2s;
          }
          
          .create-folders-button:hover {
            background-color: #0056b3;
          }
          
          .create-folders-button:active {
            background-color: #004085;
          }
        `}</style>
      </div>
    );
  }
}

export default NavbarFolderWidget;