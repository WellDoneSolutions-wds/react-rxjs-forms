import { take } from "rxjs/operators";
import { useQueryParams$ } from "../../../common/hooks/useQueryParams"
import { BillingSearch } from "./BillingSearch";
import { BillingTable } from "./BillingTable";

export const BillingResource = () => {
    const params$ = useQueryParams$();

    return (<>
        <div className="p-grid">
            <BillingSearch params$={params$.pipe(take(1))}></BillingSearch>
        </div>
        <div className="p-grid">
            <BillingTable params$={params$}></BillingTable>
        </div>

    </>)
}