import React, {Component} from 'react';
import CatalogItemList from './CatalogItemList';
import CategoryList from './CategoryList';

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isCategoryListOpen: false,
        };
    }

    render() {
        const {isCategoryListOpen} = this.state;

        const categoryList = isCategoryListOpen ? <CategoryList
            onOpenCategoryList={this.handleOpenCategoryListClick.bind(this)} /> : null;

        /* Если открыто окно со списком категорий - убираем скролл с body */
        document.body.style.overflow = isCategoryListOpen ? 'hidden' : 'scroll';

        return (
            <div className={'container'}>
                <div>
                    <h1 className={'display-3 mb-lg-5 mb-sm-5 mt-lg-5 mt-sm-5'}>Catalog of Items</h1>
                    <button onClick={this.handleOpenCategoryListClick}
                            className={'btn btn-primary btn-sm mb-sm-3 mb-md-3 ms-md-5 ms-sm-5'}>
                        Категории
                    </button>
                </div>

                {categoryList}

                <CatalogItemList />
            </div>
        );
    }

    handleOpenCategoryListClick = () => {
        this.setState({
            isCategoryListOpen: !this.state.isCategoryListOpen,
        });
    }
}

export default App;