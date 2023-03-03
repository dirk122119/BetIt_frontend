import Head from 'next/head'
import useSWR from 'swr'
import TickerTape from "@/components/crypto/TickerTape"
import DataTable from "@/components/crypto/Datable"
import CryptoDataTable from "@/components/crypto/CryptoDataTable"
import Image from 'next/image'

export default function CryptoIndex() {
    return (
        <div>
            <Head>
                <title>Crypto</title>
            </Head>
            <div >
                <TickerTape/>
            </div>
            <br/>
            <div><span>data from <a href="https://www.coingecko.com/">coingecko.com</a></span> <img src="/coingecko_logo_with_dark_text.png" style={{verticalAlign:"middle",width:"30px",height:"30px",borderRadius:"50%",marginRight:"20px"}}/></div>
            <div>
            <CryptoDataTable/>
            </div>
        </div>
    )
}