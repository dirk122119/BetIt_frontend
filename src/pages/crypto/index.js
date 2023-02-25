import Head from 'next/head'
import useSWR from 'swr'
import TickerTape from "@/components/crypto/TickerTape"
import DataTable from "@/components/crypto/Datable"
import CryptoDataTable from "@/components/crypto/CryptoDataTable"
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
            <CryptoDataTable/>
            </div>
        </div>
    )
}