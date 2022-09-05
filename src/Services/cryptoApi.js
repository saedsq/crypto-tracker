import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const API_KEY = process.env.REACT_APP_CRYPTO_API_KEY;
const cryptoHeaders = {
    'X-RapidAPI-Key':API_KEY,
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com';


export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery:fetchBaseQuery({
        baseUrl:baseUrl
    }),
    endpoints:(builder) => ({
        getGlobalStats: builder.query({
            query:() => {
                return {
                    url:`/stats`,
                    params:{referenceCurrencyUuid: 'yhjMzLPhuIDl'},
                    headers:cryptoHeaders
                }
            }
        }),
        getCoins:builder.query({
            query:(result) =>{
                return { 
                    url:`/coins?limit=${result}`,
                    params:{referenceCurrencyUuid: 'yhjMzLPhuIDl'},
                    headers:cryptoHeaders
            }
           
        }}),
        getCoinDetails:builder.query({
            query:(coinId) => {
                return{
                    url:`/coin/${coinId}`,
                    params:{referenceCurrencyUuid: 'yhjMzLPhuIDl'},
                    headers:cryptoHeaders
                }
            }
            
        }),
        getCoinHistory:builder.query({
            query:(arg)=> {
                const {coinId,time} = arg;
                console.log('arg:', arg);
                return { 
                    url:`/coin/${coinId}/history`,
                    params:{referenceCurrencyUuid: 'yhjMzLPhuIDl',
                    timePeriod:time},
                    headers:cryptoHeaders
            }
            }
        }),
        getExchanges:builder.query({
            query:()=> {
                return{
                    url:'/exchanges',
                    params: {
                        referenceCurrencyUuid: 'yhjMzLPhuIDl',
                        limit: '50',
                        offset: '0',
                        orderBy: '24hVolume',
                        orderDirection: 'desc'
                },
                headers:cryptoHeaders
            }
        }
    })

    })

});

export const  {useGetGlobalStatsQuery,
              useGetCoinsQuery,
              useGetCoinDetailsQuery,
              useGetCoinHistoryQuery,
              useGetExchangesQuery
              } = cryptoApi;