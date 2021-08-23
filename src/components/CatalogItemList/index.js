import React from 'react';
import CatalogItem from '../CatalogItem';
import './style.css';

export default function CatalogItemList({items}) {
    const itemElements = items.map(item =>
        <li key={item.id} className={'col col-sm-4 catalog-item-list__li'}><CatalogItem item={item}/></li>
    );

    return(<ul className={'row'}>{itemElements}</ul>);
}