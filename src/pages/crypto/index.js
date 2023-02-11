import Head from 'next/head'
import useSWR from 'swr'
import TickerTape from "@/components/crypto/TickerTape"
import DataTable from "@/components/crypto/Datable"
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
            <div>
            <DataTable/>
            </div>
            
        </div>
    )
}