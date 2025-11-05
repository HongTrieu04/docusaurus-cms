const fs = require('fs');
const path = require('path');
const { processNavbarChanges } = require('./update-navbar-folders');

// Test data
const testNavbarData = {
  items: [
    {
      label: "Tutorial",
      to: "/docs/intro"
    },
    {
      label: "Blog",
      to: "/blog"
    },
    {
      label: "New Section",
      to: "/docs/new-section"
    },
    {
      label: "Another Section",
      to: "/docs/another-section"
    },
    {
      label: "Tutorial Basics",
      to: "/docs/tutorial-basics"
    },
    {
      label: "Tutorial Extras",
      to: "/docs/tutorial-extras"
    }
  ]
};

// Test function
function testFolderCreation() {
  console.log('=== Testing Folder Creation ===\n');
  
  // Create a test navbar.json file
  const testNavbarPath = path.join(__dirname, 'test-navbar.json');
  fs.writeFileSync(testNavbarPath, JSON.stringify(testNavbarData, null, 2));
  
  // Temporarily modify the script to use test file
  const originalScript = fs.readFileSync(path.join(__dirname, 'update-navbar-folders.js'), 'utf8');
  const modifiedScript = originalScript.replace(
    /const navbarPath = path\.join\(__dirname, 'data\/navbar\.json'\);/,
    `const navbarPath = '${testNavbarPath}';`
  );
  
  fs.writeFileSync(path.join(__dirname, 'update-navbar-folders-test.js'), modifiedScript);
  
  // Load the modified script
  const { processNavbarChanges: testProcess } = require('./update-navbar-folders-test');
  
  try {
    // Run the test
    testProcess();
    
    // Check if folders were created
    const projectRoot = path.join(__dirname, '..');
    const expectedFirstLevelFolders = ['docs', 'blog'];
    const expectedSubFolders = ['new-section', 'another-section', 'tutorial-basics', 'tutorial-extras'];
    
    console.log('Checking for created folders...');
    
    let allCreated = true;
    
    // Check first-level folders
    console.log('\n=== Checking First-Level Folders ===');
    expectedFirstLevelFolders.forEach(folderName => {
      const folderPath = path.join(projectRoot, folderName);
      if (fs.existsSync(folderPath)) {
        console.log(`✅ First-level folder exists: ${folderName}`);
        
        // Check for _category_.json
        const categoryPath = path.join(folderPath, '_category_.json');
        if (fs.existsSync(categoryPath)) {
          console.log(`  ✅ _category_.json exists in ${folderName}`);
        } else {
          console.log(`  ❌ _category_.json missing in ${folderName}`);
          allCreated = false;
        }
      } else {
        console.log(`❌ First-level folder missing: ${folderName}`);
        allCreated = false;
      }
    });
    
    // Check subfolders
    console.log('\n=== Checking Subfolders ===');
    expectedSubFolders.forEach(folderName => {
      const folderPath = path.join(projectRoot, 'docs', folderName);
      if (fs.existsSync(folderPath)) {
        console.log(`✅ Subfolder created: ${folderName}`);
        
        // Check for index.md
        const indexPath = path.join(folderPath, 'index.md');
        if (fs.existsSync(indexPath)) {
          console.log(`  ✅ index.md created in ${folderName}`);
        } else {
          console.log(`  ❌ index.md missing in ${folderName}`);
          allCreated = false;
        }
        
        // Check for _category_.json
        const categoryPath = path.join(folderPath, '_category_.json');
        if (fs.existsSync(categoryPath)) {
          console.log(`  ✅ _category_.json created in ${folderName}`);
        } else {
          console.log(`  ❌ _category_.json missing in ${folderName}`);
          allCreated = false;
        }
      } else {
        console.log(`❌ Subfolder not created: ${folderName}`);
        allCreated = false;
      }
    });
    
    if (allCreated) {
      console.log('\n✅ All test folders created successfully!');
    } else {
      console.log('\n❌ Some folders were not created or are incomplete');
    }
    
    // Check if sidebars.js was updated
    const sidebarsPath = path.join(__dirname, '..', 'sidebars.js');
    if (fs.existsSync(sidebarsPath)) {
      const sidebarsContent = fs.readFileSync(sidebarsPath, 'utf8');
      const sidebarContainsNewSections = ['new-section', 'another-section'].some(folder => 
        sidebarsContent.includes(folder)
      );
      
      if (sidebarContainsNewSections) {
        console.log('✅ Sidebar configuration updated successfully!');
      } else {
        console.log('❌ Sidebar configuration was not updated');
      }
    } else {
      console.log('❌ sidebars.js does not exist');
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    // Cleanup
    if (fs.existsSync(testNavbarPath)) {
      fs.unlinkSync(testNavbarPath);
    }
    if (fs.existsSync(path.join(__dirname, 'update-navbar-folders-test.js'))) {
      fs.unlinkSync(path.join(__dirname, 'update-navbar-folders-test.js'));
    }
  }
  
  console.log('\n=== Test Completed ===');
}

// Run the test
testFolderCreation();