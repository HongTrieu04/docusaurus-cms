const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Read the config.yml file to extract collection names
    const configPath = path.join(__dirname, '..', '..', '..', 'static', 'admin', 'config.yml');
    const configContent = fs.readFileSync(configPath, 'utf8');
    
    // Parse collections from config.yml
    const collections = [];
    
    // Extract collection names using regex
    const collectionRegex = /name:\s*"([^"]+)"/g;
    let match;
    
    while ((match = collectionRegex.exec(configContent)) !== null) {
      const collectionName = match[1];
      
      // Skip the 'settings' collection as it's not a content collection
      if (collectionName !== 'settings') {
        // Get collection label for better display
        const labelMatch = configContent.match(new RegExp(`label:\s*"([^"]+)"\\s*\\n\\s*name:\\s*"${collectionName}"`));
        const collectionLabel = labelMatch ? labelMatch[1] : collectionName;
        
        collections.push({
          value: collectionName,
          label: collectionLabel
        });
      }
    }
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({
        collections: collections,
        success: true
      })
    };
    
  } catch (error) {
    console.error('Error fetching collections:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({
        error: 'Failed to fetch collections',
        success: false
      })
    };
  }
};