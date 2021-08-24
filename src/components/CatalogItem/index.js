import React, {Component} from 'react';
import './style.css';

class CatalogItem extends Component {
    render() {
        const {item, isOpen, onOpenButtonClick, onDeleteButtonClick} = this.props;
        const body = isOpen && item.body

        return (
            <div className={'card'}>
                <div className={'row'}>
                    <div className={'col-md-4'}>
                        <img src={'images/logo-og.png'} alt={'This is plug image'} className={'card-img'} />
                    </div>
                    <div className={'col-md-6'}>
                        <div className={'card-body'}>
                            <h5 className={'card-title'}>
                                {item.title}
                            </h5>
                            <p className={'card-text mt-sm-4 mt-md-4'}>{body}</p>
                            <h6 className={'card-subtitle text-muted'}>{item.category_name}</h6>
                        </div>
                    </div>
                    <div className={'col-md-2'}>
                        <button onClick={onOpenButtonClick} className={'btn btn-primary btn-sm ms-sm-2 mt-sm-3'}>
                            {isOpen ? 'Закрыть' : 'Открыть'}
                        </button>
                        <button onClick={onDeleteButtonClick}
                                className={'btn btn-danger btn-sm ms-sm-2 mt-sm-3'}>Удалить</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default CatalogItem;