import { Request, Response, NextFunction } from 'express';
import { Controller, Get, Post } from '@overnightjs/core';
import * as Client from 'bitcoin-core';
import * as config from 'config';

@Controller('api/v1')
export class ApiController {

    private clients:any = {};
    private limit:number = 100;

    constructor() {
        const navcoin = new Client(config.get('navcoin'))
        this.clients.navcoin = navcoin;
    }

    middleware(req: Request, res: Response, next: NextFunction) {
        if (this.clients.hasOwnProperty(req.params.clientName)) return next();
        return res.status(400).json({
            message: `Unsupported Blockchain: '${req.params.clientName}'`
        });
    }
    
    @Get('getinfo/:clientName')
    protected getinfo(req: Request, res: Response) {
        this.middleware(req, res, () => {
            this.clients[req.params.clientName].getInfo().then((rpcRes:any) => {
                return res.status(200).json({
                    message: 'OK',
                    data: rpcRes
                });
            }).catch((error: any) => {
                return res.status(500).json({
                    message: 'Something went wrong',
                    data: error
                });
            })
        })//middleware      
    }

    @Post('addresstransactions/:clientName')
    protected addresstransactions(req: Request, res: Response) {
        this.middleware(req, res, () => {

            const addresses:Array<string> = req.body.addresses

            if (!Array.isArray(addresses) || addresses.length < 1) {
                return res.status(400).json({
                    message: `Must include 'addresses:Array<string>'`,
                    req: req.body,
                });
            }

            const rpcArgs = {
                addresses: addresses,
                start: 0,
                end: 10000000
            }

            this.clients[req.params.clientName].command('getaddresstxids', rpcArgs).then((rpcResponse:any) => {
                const txids:Array<string> = rpcResponse;
                this.getTransactionDetails(req.params.clientName, addresses[0], txids, (error:string, data:Array<any>) => {
                    if (error) {
                        return res.status(500).json({
                            message: 'Something went wrong',
                            code: 101,
                            data: error
                        });
                    }
                    return res.status(200).json({
                        message: 'OK',
                        data: data
                    });
                })
            }).catch((error: any) => {
                return res.status(500).json({
                    message: 'Something went wrong',
                    code: 100,
                    data: error
                });
            })
        })//middleware      
    }

    //@TODO abstract this into a navcoin specific data service
    getTransactionDetails(clientName:string, address:string, txids:Array<string>, cb:Function, index:number = 0, processed:Array<any> = []) {
        
        //@TODO look at batching these instead
        //https://www.npmjs.com/package/bitcoin-core#batch-requests

        this.clients[clientName].getRawTransaction(txids[index]).then((rawtx:any) => {
            this.clients[clientName].decodeRawTransaction(rawtx).then((decoded:any) => {
                
                //@TODO account for all the different types of transactions
                for(var i=0, l=decoded.vout.length; i<l; i++){
                    if (decoded.vout[i].scriptPubKey.type === 'pubkeyhash') {
                        const addressIndex = decoded.vout[i].scriptPubKey.addresses.findIndex((vout:any) => vout == address)
                        if (addressIndex !== -1) {
                            const tx = {
                                txid: decoded.txid,
                                type: 'receive',
                                value: decoded.vout[i].value,
                                valueSat: decoded.vout[i].valueSat,
                                time: decoded.time,
                            }
                            processed.push(tx)
                        }
                    }
                    
                }
                // for(var i=0, l=decoded.vin.length; i<l; i++){
                //     const processedIndex = processed.findIndex((tx:any) => tx.txid == decoded.vin[i].txid)
                //     if (processedIndex !== -1) {
                //         const tx = {
                //             txid: decoded.txid,
                //             type: 'send',
                //             value: processed[processedIndex].value,
                //             valueSat: processed[processedIndex].valueSat,
                //             time: decoded.time,
                //         }
                //         processed.push(tx)
                //     }
                // }
                if (index < txids.length && index < this.limit) {
                    const nextIndex = index+1
                    this.getTransactionDetails(clientName, address, txids, cb, nextIndex, processed)
                } else {
                    return cb(false, processed)
                }
            }).catch((error: any) => {
                console.log('error', error)
                return cb(error)
            })
        }).catch((error: any) => {
            console.log('error', error)
            return cb(error)
        })
    }

    @Post('broadcast/tx/:clientName')
    protected broadcastTx(req: Request, res: Response) {
        this.middleware(req, res, () => {
            const signedTx:string = req.body.signedtx

                if (!signedTx) {
                    return res.status(400).json({
                        message: `Must include 'signedtx:string'`,
                        req: req.body,
                    });
                }

            this.clients[req.params.clientName].sendRawTransaction(signedTx).then((rpcResponse:any) => {
                return res.status(200).json({
                    message: 'OK',
                    data: rpcResponse
                });
            }).catch((error: any) => {
                return res.status(500).json({
                    message: 'Something went wrong',
                    data: error
                });
            })
        })//middleware
    }

}
