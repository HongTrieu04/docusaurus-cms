import React from 'react';
import PropTypes from 'prop-types';

class CollectionSelectWidget extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    forName: PropTypes.string,
    classNameWrapper: PropTypes.string,
    setActiveStyle: PropTypes.func,
    setInactiveStyle: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      collections: [],
      loading: true
    };
  }

  componentDidMount() {
    this.fetchCollections();
  }

  fetchCollections = async () => {
    try {
      // Fetch available collections from the Netlify function
      const response = await fetch('/.netlify/functions/get-collections');
      const data = await response.json();
      
      if (data.collections) {
        this.setState({ 
          collections: data.collections,
          loading: false 
        });
      }
    } catch (error) {
      console.log('Could not fetch collections:', error);
      // Fallback to hardcoded collections if API fails
      this.setState({
        collections: [
          { value: 'blog', label: 'Blog', path: '/blog' },
          { value: 'docs', label: 'Docs', path: '/docs' },
          { value: 'tutorialSidebar', label: 'Tutorial Sidebar', path: '/docs' }
        ],
        loading: false
      });
    }
  };

  handleChange = (e) => {
    const { onChange } = this.props;
    const selectedValue = e.target.value;
    
    // Update the collection field
    onChange(selectedValue);
    
    // If a collection is selected, automatically populate the 'to' field
    if (selectedValue) {
      const selectedCollection = this.state.collections.find(col => col.value === selectedValue);
      if (selectedCollection && selectedCollection.path) {
        this.updateToField(selectedCollection.path);
      }
    }
  };

  updateToField = (path) => {
    // Find the parent widget (list item) and update the 'to' field
    const widget = document.querySelector('.nc-widget-collectionSelectWidget');
    if (widget) {
      const listItem = widget.closest('.nc-list-item');
      if (listItem) {
        const toField = listItem.querySelector('input[name="to"]');
        if (toField) {
          toField.value = path;
          // Trigger change events
          toField.dispatchEvent(new Event('input', { bubbles: true }));
          toField.dispatchEvent(new Event('change', { bubbles: true }));
          
          // Also trigger the onChange callback for the 'to' field
          const toWidget = listItem.querySelector('.nc-widget-string');
          if (toWidget) {
            const toInput = toWidget.querySelector('input');
            if (toInput) {
              toInput.dispatchEvent(new Event('input', { bubbles: true }));
              toInput.dispatchEvent(new Event('change', { bubbles: true }));
            }
          }
        }
      }
    }
  };

  render() {
    const { value, classNameWrapper } = this.props;
    const { collections, loading } = this.state;

    if (loading) {
      return (
        <select className={classNameWrapper} disabled>
          <option value="">Đang tải collections...</option>
        </select>
      );
    }

    return (
      <select
        className={classNameWrapper}
        value={value || ''}
        onChange={this.handleChange}
      >
        <option value="">-- Chọn Collection --</option>
        {collections.map((collection) => (
          <option key={collection.value} value={collection.value}>
            {collection.label}
          </option>
        ))}
      </select>
    );
  }
}

export default CollectionSelectWidget;