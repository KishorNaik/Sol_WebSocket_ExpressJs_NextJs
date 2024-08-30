import express from 'express';
import { Server } from 'http';
import { WebSocketHubStartAsync, runWebSocketServerAsync } from './webStocket';
import { StockWebSocket } from './modules/stock';
import { NewsFeedWebsocket } from './modules/newsFeed';

const app = express();
const server = new Server(app);
const port = 3001;

runWebSocketServerAsync(server);

WebSocketHubStartAsync(()=>{
    console.log('Stock Hub started');
    const stockWebSocket:StockWebSocket=new StockWebSocket();
    stockWebSocket.broadcastStockPriceAsync();
});

WebSocketHubStartAsync(()=>{
    console.log('News Feed Hub started');
    const newsFeed:NewsFeedWebsocket=new NewsFeedWebsocket();
    newsFeed.broadcastNewsFeedAsync();
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});