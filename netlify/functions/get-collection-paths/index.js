const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // Define collection paths mapping
    const collectionPaths = {
      'blog': '/blog',
      'docs': '/docs',
      'tutorialSidebar': '/docs' // Tutorial sidebar points to docs
    };
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({
        collectionPaths: collectionPaths,
        success: true
      })
    };
    
  } catch (error) {
    console.error('Error fetching collection paths:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
      },
      body: JSON.stringify({
        error: 'Failed to fetch collection paths',
        success: false
      })
    };
  }
};