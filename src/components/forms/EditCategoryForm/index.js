import React, {Component} from 'react';
import '../style.css';

class EditCategoryForm extends Component {
    constructor(props) {
        super(props);

        const {categoryId, categoryName} = props;

        this.state = {
            categoryId: categoryId,
            categoryName: categoryName,
        };
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
        const {onEditCategoryForm} = this.props;

        return (
            <div>
                <div className={'hover__div'} />
                <div className={'add-form__div'}>
                    <div>
                        <button className={'btn btn-danger btn-sm float-end mb-sm-3 mb-md-3'}
                                onClick={onEditCategoryForm}>X</button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className={'mb-3'}>
                            <label htmlFor={'title'} className={'form-label'}>Название</label>
                            <input type={'text'} className={'form-control'} id={'categoryName'}
                                   placeholder={'Введите название'} value={this.state.categoryName}
                                   onChange={this.handleInputChange.bind(this)} />
                        </div>
                        <input type={'submit'} value={'Отправить'}
                               className={'btn btn-success btn-sm mt-md-3 mt-sm-3'} />
                    </form>
                </div>
            </div>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const {categoryId, categoryName} = this.state;

        if (categoryName.trim() === '') {
            alert('Пустой заголовок');
            return;
        }

        const category = {
            id: categoryId,
            name: categoryName,
        };

        fetch('http://localhost/product-catalog-back/api/updateCategory.php',
            {
                method: 'POST',
                body: JSON.stringify(category)
            })
            .then(
                (response) => {
                    if (response.ok) {
                        alert('Имя категории изменено.');
                        window.location.reload();
                    }

                },
                (error) => {
                    return <div>Ошибка: {error.message}</div>
                }
            );
    }

}

export default EditCategoryForm;