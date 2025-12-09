import React from 'react';
import { useCart, useDispatchCart } from '../contexts/CartContext';

export default function CartDrawer({open, onClose}) {
  const { items } = useCart();
  const dispatch = useDispatchCart();

  const total = items.reduce((s,i)=> s + (parseInt(String(i.price).replace(/[^0-9]/g,''))||0) * i.qty, 0);

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'block' : 'hidden'}`}>
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <aside className="absolute right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl p-6 overflow-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cart</h3>
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>

        <div className="mt-6">
          {items.length === 0 ? (
            <div className="text-gray-500">Your cart is empty.</div>
          ) : (
            <ul className="space-y-4">
              {items.map(item => (
                <li key={item.id} className="flex items-center gap-4">
                  <img src={item.img} alt={item.alt} className="w-16 h-16 object-cover rounded"/>
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.price}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => dispatch({type:'UPDATE_QTY', payload:{id:item.id, qty: Math.max(1, item.qty - 1)}})} className="px-2 py-1 border rounded">-</button>
                      <div>{item.qty}</div>
                      <button onClick={() => dispatch({type:'UPDATE_QTY', payload:{id:item.id, qty: item.qty + 1}})} className="px-2 py-1 border rounded">+</button>
                      <button onClick={() => dispatch({type:'REMOVE', payload:item.id})} className="ml-4 text-sm text-red-500">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">Total</div>
            <div className="font-semibold">₹{total}</div>
          </div>
          <div className="mt-4">
            <button className="w-full px-4 py-3 bg-black text-white rounded-lg">Proceed to Checkout</button>
          </div>
        </div>
      </aside>
    </div>
  );
}
