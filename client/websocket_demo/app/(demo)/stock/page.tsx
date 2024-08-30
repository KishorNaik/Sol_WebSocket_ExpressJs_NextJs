"use client";

import dynamic from "next/dynamic";
import useStockWebSocket from "./_hooks";
import { Suspense } from "react";

// Dynamically import the StockPage component
const StockComp = dynamic(() => import('./_components/stockUpdate'), {
    suspense: true,
});

const StockPage=()=>{

    return (
        <div className="flex justify-center items-center min-h-screen bg-black">
            <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
                <StockComp />
            </Suspense>
        </div>
      );
}

export default StockPage;