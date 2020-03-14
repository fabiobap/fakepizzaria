import React from 'react';
import styled from 'styled-components';
import { ConfirmButton, DialogFooter, DialogContent, getPrice } from '../FoodDialog/FoodDialog';
import { formatPrice } from '../Data/FoodData';

const database = window.firebase.database();

const OrderStyled = styled.div`
position: fixed;
right: 0px;
top: 48px;
width: 340px;
height: calc(100% - 48px);
background-color: white;
z-index: 10;
box-shadow: 4px 0px 5px 4px grey;
display:flex;
flex-direction: column;
`;

const OrderContent = styled(DialogContent)`
padding: 20px;
height: 100%;
`;

const OrderContainer = styled.div`
padding: 10px 0px;
border-bottom: 1px solid grey;
${({ editable }) => editable ?
        `
&:hover {
    cursor: pointer;
    background-color: #e7e7e7;
}
` : `
    pointer-events:none;
`}
`;

const OrderItem = styled.div`
padding: 10px 0px;
display: grid;
grid-template-columns: 20px 150px 20px 60px;
justify-content: space-between;
`;

const DetailItem = styled.div`
color: gray;
font-size: 10px;
`;

function sendOrder(orders, { email, displayName }) {
    const newOrderRef = database.ref('orders').push();
    const newOrders = orders.map(order => {
        return Object.keys(order).reduce((acc, orderKey) => {
            if (!order[orderKey]) {
                return acc;
            }
            if (orderKey === "toppings") {
                return {
                    ...acc,
                    [orderKey]: order[orderKey]
                        .filter(({ checked }) => checked)
                        .map(({ name }) => name)
                };
            }
            return {
                ...acc,
                [orderKey]: order[orderKey]
            };
        }, {});
    });
    newOrderRef.set({
        order: newOrders,
        email, displayName
    });
}

export function Order({ orders, setOrders, setOpenFood, login, loggedIn, setOpenOrderDialog }) {
    const subtotal = orders.reduce((total, order) => {
        return total + getPrice(order);
    }, 0);
    const tax = subtotal * 0.7;
    const total = subtotal + tax;

    const deleteItem = index => {
        const newOrders = [...orders];
        newOrders.splice(index, 1);
        setOrders(newOrders);
    }

    return (
        <OrderStyled>
            {orders.length === 0 ? (
                <OrderContent>Your order is empty!</OrderContent>
            ) : (
                    <OrderContent>
                        {" "}
                        <OrderContainer>Your order: </OrderContainer>{" "}
                        {orders.map((order, index) => (
                            <OrderContainer editable>
                                <OrderItem onClick={() => {
                                    setOpenFood({ ...order, index })
                                }}>
                                    <div>{order.quantity}</div>
                                    <div>{order.name}</div>
                                    <div
                                        style={{ cursor: 'pointer' }}
                                        onClick={e => {
                                            e.stopPropagation();
                                            deleteItem(index)
                                        }}
                                    >
                                        <span role='img' aria-label="trash bin">🗑️</span>
                                    </div>
                                    <div>{formatPrice(getPrice(order))}</div>
                                </OrderItem>
                                <DetailItem>
                                    {order.toppings
                                        .filter(t => t.checked)
                                        .map(topping => topping.name)
                                        .join(", ")}
                                </DetailItem>
                                {order.choice && <DetailItem>{order.choice}</DetailItem>}
                            </OrderContainer>
                        ))}
                        <OrderContainer>
                            <OrderItem>
                                <div />
                                <div>Sub-Total:</div>
                                <div>{formatPrice(subtotal)}</div>
                            </OrderItem>
                        </OrderContainer>
                        <OrderContainer>
                            <OrderItem>
                                <div />
                                <div>Tax:</div>
                                <div>{formatPrice(tax)}</div>
                            </OrderItem>
                        </OrderContainer>
                        <OrderContainer>
                            <OrderItem>
                                <div />
                                <div>Total:</div>
                                <div>{formatPrice(total)}</div>
                            </OrderItem>
                        </OrderContainer>
                    </OrderContent>
                )}
            {orders.length > 0 && <DialogFooter>
                <ConfirmButton onClick={() => {
                    if (loggedIn) {
                        setOpenOrderDialog(true);
                        sendOrder(orders, loggedIn);
                    } else {
                        login();
                    }
                }
                }>Checkout</ConfirmButton>
            </DialogFooter>}
        </OrderStyled>
    );
}