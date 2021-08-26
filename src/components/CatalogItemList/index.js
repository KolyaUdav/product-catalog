import React, {Component} from 'react';
import CatalogItem from '../CatalogItem';
import AddForm from '../AddForm';
import './style.css';

class CatalogItemList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            openCatalogItemId: null,
            addFormIsOpen: false
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
        const {error, isLoaded, items, addFormIsOpen} = this.state;

        const catalogItemForm = addFormIsOpen ? <AddForm
            onOpenCatalogItemForm={this.handleOpenAddFormClick.bind(this)} /> : null;

        if (error) {
            return <div>Ошибка: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Идёт загрузка...</div>
        } else {
            return (
                <div>
                    {catalogItemForm}

                    <ul>
                        <button onClick={this.handleOpenAddFormClick}
                                className={'btn btn-success btn-sm mb-sm-3 mb-md-3'}>Добавить</button>
                        {items.map(item => (
                            <li key={item.id} className={'mb-md-3 mb-sm-3 catalog-item-list__li'}>
                                <CatalogItem item={item} isOpen={this.state.openCatalogItemId === item.id}
                                             onOpenButtonClick={this.handleOpenClick.bind(this, item.id)}
                                             onDeleteButtonClick={this.handleRemoveClick.bind(this, item.id)}/>
                            </li>))}
                    </ul>
                </div>);
        }
    }

    handleOpenClick = itemId => this.setState({
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

    handleOpenAddFormClick = () => {
        this.setState({
            addFormIsOpen: !this.state.addFormIsOpen
        });
    }

}

export default CatalogItemList;