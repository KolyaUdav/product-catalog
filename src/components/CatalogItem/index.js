import React, {Component} from 'react';
import './style.css';

class CatalogItem extends Component {
    state = {
        isOpen: false
    }

    render() {
        const {item} = this.props;
        const body = this.state.isOpen && <section>{item.body}</section>

        return (
            <div className={'card mb-md-3'}>
                <img src={'images/logo-og.png'} className={'card-img-top'} />
                <div className={'card-body'}>
                    <h5 className={'card-title'}>
                        {item.title}
                        <button onClick={this.handleClickBody} className={'btn btn-primary btn-sm float-end'}>
                            {this.state.isOpen ? 'Close' : 'Open'}
                        </button>
                    </h5>
                    <p className={'card-text'}>{body}</p>
                    <h6 className={'card-subtitle text-muted'}>{item.category_name}</h6>
                </div>
            </div>
        );
    }

    handleClickBody = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

}

export default CatalogItem;