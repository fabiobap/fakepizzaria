import React from 'react';
import { Dialog, DialogContent, DialogShadow, DialogFooter, ConfirmButton } from '../FoodDialog/FoodDialog';

export function OrderDialog({ openOrderDialog, setOpenOrderDialog, setOrders }) {

    return openOrderDialog ?
        <>
            <DialogShadow />
            <Dialog>
                <DialogContent>
                    <h2><span role='img' aria-label="order sent">🚚</span> Your order is on the way!</h2>
                    <p>You have been emailed confirmation of your order. Thank for choosing Fake Pizzaria ;)</p>
                </DialogContent>
                <DialogFooter>
                    <ConfirmButton onClick={() => {
                        setOrders([]);
                        setOpenOrderDialog();
                    }}>
                        I'm still hungry!
                </ConfirmButton>
                </DialogFooter>
            </Dialog>
        </>
        : <div />
}