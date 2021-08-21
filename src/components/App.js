import React from 'react';
import CatalogItem from './CatalogItem';
import catalogItems from '../plug';

function App() {
    return (
        <div>
            <h1>Catalog of Items</h1>
            <CatalogItem item={catalogItems[0]} />
        </div>
    );
}

export default App;