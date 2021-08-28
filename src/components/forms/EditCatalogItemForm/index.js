import React, {Component} from 'react';
import '../style.css';

class EditCatalogItemForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            error: null,
            isLoaded: false,
            id: '',
            title: '',
            body: '',
            category: 1,
        }
    }

    componentDidMount() {
        const {id, title, body, categoryId} = this.props;

        /* Передаём в state текущий catalogItem для дальнейшей работы в форме */
        this.setState({
            id: id,
            title: title,
            body: body,
            category: categoryId,
            categories: [],
        });

        fetch('http://localhost/product-catalog-back/api/getCategoryList.php')
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    categories: result.data,
                    isLoaded: true
                });
            }, (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const id = target.id;

        this.setState({
            [id]: value,
        });
    }

    render() {
        const {categories, error, isLoaded} = this.state;

        /**
         * Отвечает за сокрытие/демонстрацию формы
         * */
        const {onEditCatalogItemForm} = this.props;

        if (error) {
            return <div>Ошибка: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Загрузка...</div>
        } else {
            return (
                <div>
                    <div className={'hover__div'} />
                    <div className={'add-form__div'}>
                        <div>
                            <button className={'btn btn-danger btn-sm float-end mb-sm-3 mb-md-3'}
                                    onClick={onEditCatalogItemForm}>X</button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className={'mb-3'}>
                                <label htmlFor={'title'} className={'form-label'}>Название</label>
                                <input type={'text'} className={'form-control'} id={'title'}
                                       placeholder={'Введите название'} value={this.state.title}
                                       onChange={this.handleInputChange.bind(this)} />
                            </div>
                            <div className={'mb-3'}>
                                <label htmlFor={'body'} className={'form-label'}>Описание</label>
                                <textarea className={'form-control'} id={'body'} rows={'3'}
                                          placeholder={'Введите описание'} value={this.state.body}
                                          onChange={this.handleInputChange.bind(this)} />
                            </div>
                            <div className={'mb-3'}>
                                <select className="form-select" aria-label="Default select example" id={'category'}
                                        value={this.state.category}
                                        onChange={this.handleInputChange.bind(this)}>
                                    {
                                        categories.map(
                                            category => (<option key={category.id} value={category.id}>{category.name}</option>)
                                        )
                                    }
                                </select>
                            </div>
                            <input type={'submit'} value={'Отправить'}
                                   className={'btn btn-success btn-sm mt-md-3 mt-sm-3'} />
                        </form>
                    </div>
                </div>
            );
        }
    }

    /* Обработка поступивших из формы данных, отправка на сервер */
    handleSubmit = event => {
        event.preventDefault();

        const idVal = this.state.id;
        const titleVal = this.state.title;
        const bodyVal = this.state.body;
        const categoryVal = this.state.category;

        if (titleVal.trim() === '') {
            alert('Пустой заголовок');
            return;
        }

        if (bodyVal.trim() === '') {
            alert('Пустое описание');
            return;
        }

        if (categoryVal.toString().trim() === '') {
            alert('Не выбрана категория');
            return;
        }

        /* Объект для отправки на сервер */
        const catalogItem = {
            id: idVal,
            title: titleVal,
            body: bodyVal,
            category_id: categoryVal
        };

        fetch('http://localhost/product-catalog-back/api/updateSingleCatalogItem.php',
            {
                method: 'POST',
                body: JSON.stringify(catalogItem)
            })
            .then(
                (response) => {
                    if (response.ok) {
                        alert('CatalogItem обновлён.');
                        window.location.reload();
                    }

                },
                (error) => {
                    return <div>Ошибка: {error.message}</div>
                }
            );
    }

}

export default EditCatalogItemForm;