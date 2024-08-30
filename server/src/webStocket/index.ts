import { WebSocketServer } from 'ws';
import { Server } from 'http';

const wssStockUpdate = new WebSocketServer({ noServer: true });
const wssNewsFeed = new WebSocketServer({ noServer: true });

export const runWebSocketServerAsync=(server:Server): Promise<void> => {
    return new Promise((resolve, reject)=>{
        try
        {
            console.log(`Web socket server start.`);
            server.on('upgrade', (request, socket, head) => {

                const pathname = request.url;

                if(pathname === '/stockupdate'){
                    wssStockUpdate.handleUpgrade(request, socket, head, (ws) => {
                        wssStockUpdate.emit('connection', ws, request);
                    });
                }
                else if(pathname === '/newsfeed'){
                    wssNewsFeed.handleUpgrade(request, socket, head, (ws) => {
                        wssNewsFeed.emit('connection', ws, request);
                    });
                }
                else
                {
                    console.log(`Web socket server stop.`);
                    socket.destroy();
                }

            });
            return resolve();
        }
        catch(ex){
            return reject(ex);
        }
    });
}

export const WebSocketHubStartAsync=(call:()=> void): Promise<void> => {
    try
    {
        call();
        return Promise.resolve();
    }
    catch(ex){
        return Promise.reject(ex);
    }
}

export {
    wssStockUpdate,
    wssNewsFeed
}