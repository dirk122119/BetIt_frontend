import Head from 'next/head'

import UsDataTable from "@/components/usStock/UsDataTable"
export default function CryptoIndex() {
    return (
        <div>
            <Head>
                <title>US</title>
            </Head>

            <br/>
            <div>
            <UsDataTable/>
            </div>
            
        </div>
    )
}