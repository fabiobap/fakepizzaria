import React from 'react';
import styled from 'styled-components';
import { ConfirmButton, DialogFooter, DialogContent, getPrice } from '../FoodDialog/FoodDialog';
import { formatPrice } from '../Data/FoodData';

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
`;

const OrderItem = styled.div`
padding: 10px 0px;
display: grid;
grid-template-columns: 20px 150px 20px 60px;
justify-content: space-between;
`;

export function Order({ orders }) {
    return (
        <OrderStyled>
            {orders.length === 0 ? (
                <OrderContent>Your order is empty!</OrderContent>
            ) : (
                    <OrderContent>
                        {" "}
                        <OrderContainer>Your order: </OrderContainer>{" "}
                        {orders.map(order => (
                            <OrderContainer>
                                <OrderItem>
                                    <div>{order.quantity}</div>
                                    <div>{order.name}</div>
                                    <div />
                                    <div>{formatPrice(getPrice(order))}</div>
                                </OrderItem>
                            </OrderContainer>
                        ))}
                    </OrderContent>
                )}
            <DialogFooter>
                <ConfirmButton>Checkout</ConfirmButton>
            </DialogFooter>
        </OrderStyled>
    );
}