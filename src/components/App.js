import React from 'react';
import catalogItems from '../plug';
import CatalogItemList from './CatalogItemList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <div className={'container'}>
            <div>
                <h1 className={'display-3'}>Catalog of Items</h1>
            </div>
            <CatalogItemList items={catalogItems} />
        </div>
    );
}

export default App;