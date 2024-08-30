"use client";

import useStockWebSocket from "../_hooks";


const StockUpdate = () => {
    const { newsFeed } = useStockWebSocket('ws://localhost:3001/newsfeed');
    return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-sm w-full">
        <div>
        {newsFeed ? (
            <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-800">News Feed</h2>
                <p className="text-gray-700">headline: {newsFeed.headline}</p>
                <p className="text-gray-700">Content: {newsFeed.content}</p>
            </div>
        ) : (
            <p className="text-gray-500">Loading...</p>
        )}
        </div>
    </div>
    );
};

export default StockUpdate;
