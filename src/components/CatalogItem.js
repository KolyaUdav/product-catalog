import React, {Component} from 'react';

class CatalogItem extends Component {

    state = {
        isOpen: false
    }

    render() {
        const {item} = this.props;
        const body = this.state.isOpen && <section>{item.body}</section>

        return (
            <div>
                <h2>
                    {item.title}
                    <button onClick={this.handleClickBody}>
                        {this.state.isOpen ? 'Close' : 'Open'}
                    </button>
                </h2>
                {body}
                <b>{item.category_name}</b>
            </div>
        );
    }

    handleClickBody = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

}

export default CatalogItem;