import React, {Component} from 'react';
import CatalogItem from '../CatalogItem';
import AddCatalogItemForm from '../forms/AddCatalogItemForm';
import AddCategoryForm from '../forms/AddCategoryForm';
import EditCatalogItemForm from "../forms/EditCatalogItemForm";
import './style.css';

class CatalogItemList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            openCatalogItemId: null,
            addFormCatalogItemIsOpen: false,
            /*addFormCategoryIsOpen: false,*/
            editFormCatalogItemIsOpen: false,
            updId: '',
            updTitle: '',
            updBody: '',
            updCategory: '',
        }
    }

    componentDidMount() {
        // сетевой запрос
        fetch('http://localhost/product-catalog-back/api/getCatalogItemList.php')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.data
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const {
            error,
            isLoaded,
            items,
            addFormCatalogItemIsOpen,
            /*addFormCategoryIsOpen,*/
            editFormCatalogItemIsOpen,
        } = this.state;

        const catalogItemForm = addFormCatalogItemIsOpen ? <AddCatalogItemForm
            onOpenCatalogItemForm={this.handleOpenAddCatalogItemFormClick.bind(this)} /> : null;

        /*const categoryItemForm = addFormCategoryIsOpen ? <AddCategoryForm
            onOpenCategoryForm={this.handleOpenAddCategoryFormClick.bind(this)} /> : null;*/

        const editCatalogItemForm = editFormCatalogItemIsOpen ? <EditCatalogItemForm
            onEditCatalogItemForm={this.handleOpenEditCatalogItemFormClick.bind(this)}
            id={this.state.updId}
            title={this.state.updTitle}
            body={this.state.updBody}
            categoryId={this.state.updCategory} /> : null;

        if (error) {
            return <div>Ошибка: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Идёт загрузка...</div>
        } else {
            return (
                <div>
                    {catalogItemForm}
                    {editCatalogItemForm}

                    <ul>
                        <button onClick={this.handleOpenAddCatalogItemFormClick}
                                className={'btn btn-success btn-sm mb-sm-3 mb-md-3'}>
                            Добавить CatalogItem
                        </button>
                        {items.map(item => (
                            <li key={item.id} className={'mb-md-3 mb-sm-3 catalog-item-list__li'}>
                                <CatalogItem item={item} isOpen={this.state.openCatalogItemId === item.id}
                                             onOpenButtonClick={this.handleOpenClick.bind(this, item.id)}
                                             onDeleteButtonClick={this.handleRemoveClick.bind(this, item.id)}
                                             onEditButtonClick={
                                                 this.handleEditButtonClick.bind(this, item.id, item.title, item.body,
                                                     item.category_id)
                                             }/>
                            </li>))
                        }
                    </ul>
                </div>);
        }
    }

    handleOpenClick = (itemId) => this.setState({
        openCatalogItemId: this.state.openCatalogItemId === itemId ? null : itemId
    });

    handleRemoveClick = (itemId) => {
        fetch('http://localhost/product-catalog-back/api/deleteSingleCatalogItem.php', {
            method: 'POST',
            body: JSON.stringify({
                id: itemId
            })
        }).then((response) => {
                this.setState({
                    items: this.state.items.filter((item) => item.id !== itemId)
                });
                alert('CatalogItem был удалён.');
            },
            (error) => {
                alert(`Ошибка удаления: ${error.message}`);
            }
        );
    }

    handleEditButtonClick = (itemId, itemTitle, itemBody, itemCategoryId) => {
        this.setState({
            editFormCatalogItemIsOpen: !this.state.editFormCatalogItemIsOpen,
            updId: itemId,
            updTitle: itemTitle,
            updBody: itemBody,
            updCategory: itemCategoryId,
        });
    }

    handleOpenAddCatalogItemFormClick = () => {
        this.setState({
            addFormCatalogItemIsOpen: !this.state.addFormCatalogItemIsOpen,
        });
    }

    handleOpenEditCatalogItemFormClick = () => {
        this.setState({
            editFormCatalogItemIsOpen: !this.state.editFormCatalogItemIsOpen,
        });
    }

}

export default CatalogItemList;