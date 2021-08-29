import React, {Component} from 'react';
import AddCategoryForm from '../forms/AddCategoryForm';
import EditCategoryForm from '../forms/EditCategoryForm';
import './style.css';

class CategoryList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryItems: [],
            categoryId: '',
            categoryName: '',
            isLoaded: false,
            error: null,
            isOpenAddCategoryForm: false,
            isOpenEditCategoryForm: false,
        }
    }

    componentDidMount() {
        // сетевой запрос
        fetch('http://localhost/product-catalog-back/api/getCategoryList.php')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        categoryItems: result.data
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
        const {onOpenCategoryList} = this.props;

        const {categoryItems, isLoaded, error, isOpenAddCategoryForm, isOpenEditCategoryForm} = this.state;

        const addCategoryForm = isOpenAddCategoryForm ? <AddCategoryForm
            onOpenCategoryForm={this.handleOpenAddCategoryForm.bind(this)} /> : null;

        const editCategoryForm = isOpenEditCategoryForm ? <EditCategoryForm
            onEditCategoryForm={this.handleOpenEditCategoryForm.bind(this)}
            categoryId={this.state.categoryId}
            categoryName={this.state.categoryName} /> : null;

        if (error) {
            return <div>Ошибка: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Идёт загрузка...</div>
        } else {
            return (
                <div>
                    {addCategoryForm}
                    {editCategoryForm}

                    <div className={'category-list-hover__div'}/>
                    <div className={'category-list__div'}>
                        <button className={'btn btn-primary btn-sm float-start'}
                                onClick={this.handleOpenAddCategoryForm}>Добавить</button>
                        <button className={'btn btn-danger btn-sm float-end mb-sm-3 mb-md-3'}
                                onClick={onOpenCategoryList}>X</button>
                        <ul className={'list-group mt-sm-5 mt-md-5'}>
                            {categoryItems.map(category => (
                                <li key={category.id} className={'list-group-item catalog-item-list__li'}>
                                    <div className={'row'}>
                                        <div className={'col-sm-10'}>{category.name}</div>
                                        <div className={'col-sm-2'}>
                                            <button className={'btn btn-sm btn-primary ms-sm-3'}
                                                    onClick={this.handleOpenEditCategoryForm.bind(
                                                        this,
                                                        category.id,
                                                        category.name)}>Р</button>
                                            <button className={'btn btn-sm btn-danger ms-sm-3'}
                                                    onClick={this.handleRemoveCategory.bind(this, category.id)}>У</button>
                                        </div>
                                    </div>
                                </li>))
                            }
                        </ul>
                    </div>
                </div>);
        }
    }

    handleOpenAddCategoryForm = () => {
        this.setState({
            isOpenAddCategoryForm: !this.state.isOpenAddCategoryForm,
        });
    }

    handleOpenEditCategoryForm = (categoryId, categoryName) => {
        this.setState({
            isOpenEditCategoryForm: !this.state.isOpenEditCategoryForm,
            categoryId: categoryId,
            categoryName: categoryName,
        });
    }


    handleRemoveCategory = (categoryId) => {
        const delCategory = {
            id: categoryId
        };

        fetch('http://localhost/product-catalog-back/api/deleteCategory.php',
            {
                method: 'POST',
                body: JSON.stringify(delCategory),
            })
            .then(
                (response) => {
                    if (response.ok) {
                        this.setState({
                            isLoaded: true,
                            categoryItems: this.state.categoryItems.filter((category) => category.id !== categoryId),
                        });
                        alert('Категория удалена.')
                    }
                },
                (error) => {
                    alert(`Ошибка удаления: ${error.message}`);
                }
            );
    }
}

export default CategoryList;