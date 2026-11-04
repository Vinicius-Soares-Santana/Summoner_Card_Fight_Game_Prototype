import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardsList } from '../CardsList';
import { ItemsList } from '../ItemsList';
import { buyItem } from '../../World/worldActions';
import './Shop.css';

function Shop({ sellerImage }) {
    const dispatch = useDispatch();

    const gold = useSelector((state) => state.playerWorld.Gold);
    const shopStock = useSelector((state) => state.shop.itemsAvailable);
    const ownedItems = useSelector((state) => state.playerWorld.Items);
    const ownedCreatures = useSelector(
        (state) => state.playerWorld.availableCreatures
    );

    const shopCreatures = shopStock.filter((id) => CardsList[id]);
    const shopItems = shopStock.filter((id) => ItemsList[id]);

    const itemCounts = {};

    for (const id of ownedItems) {
        itemCounts[id] = (itemCounts[id] ?? 0) + 1;
    }

    function showProducts(productIds, catalog) {
        if (productIds.length === 0) {
            return <p>Nothing available yet.</p>;
        }

        return productIds.map((id) => {
            const product = catalog[id];
            const alreadyOwned =
                product.type === 'creature' && ownedCreatures.includes(id);

            return (
                <div className="ShopRow" key={id}>
                    <span>
                        {product.name} · {product.price ?? '—'} gold
                    </span>

                    <button
                        type="button"
                        disabled={
                            alreadyOwned ||
                            product.price == null ||
                            gold < product.price
                        }
                        onClick={() => dispatch(buyItem(id))}
                    >
                        {alreadyOwned ? 'Owned' : 'Buy'}
                    </button>
                </div>
            );
        });
    }

    return (
        <div className="ShopScreen">
            <header className="ShopHeader">
                <div className="ShopPortrait" aria-hidden="true">
                    {sellerImage ? (
                        <img src={sellerImage} alt="" />
                    ) : (
                        <span>Merchant portrait</span>
                    )}
                </div>

                <div>
                    <h2>Merchant</h2>
                    <p>Gold: {gold}</p>
                </div>
            </header>

            <div className="ShopColumns">
                <section className="ShopPanel">
                    <h3>For sale</h3>

                    <h4>Creatures</h4>
                    {showProducts(shopCreatures, CardsList)}

                    <h4>Items</h4>
                    {showProducts(shopItems, ItemsList)}
                </section>

                <section className="ShopPanel">
                    <h3>Your collection</h3>

                    <h4>Creatures</h4>
                    {ownedCreatures.length === 0 ? (
                        <p>No creatures unlocked yet.</p>
                    ) : (
                        <ul>
                            {ownedCreatures.map((id) => (
                                <li key={id}>{CardsList[id]?.name ?? id}</li>
                            ))}
                        </ul>
                    )}

                    <h4>Items</h4>
                    {ownedItems.length === 0 ? (
                        <p>Your bag is empty.</p>
                    ) : (
                        <ul>
                            {Object.keys(itemCounts).map((id) => (
                                <li key={id}>
                                    {ItemsList[id]?.name ?? id} ×{itemCounts[id]}
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}

export default Shop;