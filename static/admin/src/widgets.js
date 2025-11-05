import NavbarFolderWidget from './components/NavbarFolderWidget';
import CollectionSelectWidget from './components/CollectionSelectWidget';

export default {
  name: 'netlify-cms-custom-widgets',
  widgets: [
    {
      name: 'navbarFolderWidget',
      component: NavbarFolderWidget,
    },
    {
      name: 'collectionSelectWidget',
      component: CollectionSelectWidget,
    },
  ],
};