"use client";

import useStockWebSocket from "../_hooks";


const StockUpdate = () => {
    const { stockPrice } = useStockWebSocket('ws://localhost:3001/stockupdate');
    return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <div>
        {stockPrice ? (
            <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">Stock Price</h2>
                <p className="text-gray-700">Symbol: {stockPrice.symbol}</p>
                <p className="text-gray-700">Price: ${stockPrice.price}</p>
            </div>
        ) : (
            <p className="text-gray-500">Loading...</p>
        )}
        </div>
    </div>
    );
};

export default StockUpdate;
