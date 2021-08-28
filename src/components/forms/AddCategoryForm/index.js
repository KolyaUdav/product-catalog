import React, {Component} from 'react';
import '../style.css';

class AddCategoryForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            name: '',
        }
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
        const {onOpenCategoryForm} = this.props;

        return (
            <div>
                <div className={'hover__div'} />
                <div className={'add-form__div'}>
                    <div>
                        <button className={'btn btn-danger btn-sm float-end mb-sm-3 mb-md-3'}
                                onClick={onOpenCategoryForm}>X</button>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <div className={'mb-3'}>
                            <label htmlFor={'title'} className={'form-label'}>Название</label>
                            <input type={'text'} className={'form-control'} id={'name'}
                                   placeholder={'Введите название'} value={this.state.title}
                                   onChange={this.handleInputChange.bind(this)} />
                        </div>
                        <input type={'submit'} value={'Отправить'}
                               className={'btn btn-success btn-sm mt-md-3 mt-sm-3'} />
                    </form>
                </div>
            </div>
        );
    }

    handleSubmit = event => {
        event.preventDefault();

        const nameVal = this.state.name;

        if (nameVal.trim() === '') {
            alert('Пустой заголовок');
            return;
        }

        const category = {
            name: nameVal,
        };

        fetch('http://localhost/product-catalog-back/api/createCategory.php',
            {
                method: 'POST',
                body: JSON.stringify(category)
            })
            .then(
                (response) => {
                    if (response.ok) {
                        alert('Новый Category добавлен.');
                        window.location.reload();
                    }

                },
                (error) => {
                    return <div>Ошибка: {error.message}</div>
                }
            );
    }

}

export default AddCategoryForm;