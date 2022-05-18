import { useAsyncExecutor } from "async-executor-hook"
import { FC } from "react"
import { Observable } from "rxjs"
import { ajax } from "rxjs/ajax";
import { delay, map } from "rxjs/operators";

interface IBillingTable {
    params$: Observable<any>
}

export const BillingTable: FC<IBillingTable> = ({ params$ }) => {

    const loadDams = useAsyncExecutor(
        (params) => {
            return ajax.getJSON('/api/dams.json')
                .pipe(
                    map((resp: any) => {
                        return resp.map((item: any) => {
                            return { ...item, params }
                        })
                    }),
                    delay(3000)
                )
        },
        {
            source$: params$
        }
    )


    return (
        <>
            {loadDams.status === 'PROCESSING' && <h1>PROCESANDO</h1>}

            {loadDams.status === 'SUCCESS' && <h1>{JSON.stringify(loadDams.data)}</h1>}


        </>
    )
}