import React from 'react';
import CatalogItemList from './CatalogItemList';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
    return (
        <div className={'container'}>
            <div>
                <h1 className={'display-3 mb-lg-5 mb-sm-5 mt-lg-5 mt-sm-5'}>Catalog of Items</h1>
            </div>

            <CatalogItemList />
        </div>
    );
}

export default App;