import { FC, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { FormControl, FormGroup, useFormConfig, WForm, WFormControl } from "rectangular-forms"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"
import { WInputText } from "../../../common/inputs/Inputs"
import { TemplateInputContainer } from "../../../common/inputs/TemplateInputContainer"
import queryString from "query-string";

interface IBillingSearch {
    params$: Observable<any>
}

export const BillingSearch: FC<IBillingSearch> = ({ params$ }) => {

    const history = useHistory();

    const formConfig = useFormConfig({
        createForm: (data) => {
            const form = new FormGroup({
                dni: new FormControl(),
                dam: new FormControl(),
                volantes: new FormControl()
            });
            form.patchValue(data);
            return form;
        },
        onSubmit: (form) => {
            if (form.invalid) {
                alert('invalid');
                return;
            }
            const queryParams = queryString.stringify(form.value);
            history.push(`/sdads/?${queryParams}`)
        }
    })

    useEffect(
        () => {
            const subcription = params$.pipe(
                tap(params => {
                    formConfig.loadSucceed(params)
                })
            ).subscribe();
            return () => {
                subcription.unsubscribe()
            }

        }, [params$]
    )

    return (<>
        <WForm formConfig={formConfig}>
            <div className="p-grid">
                <div className="p-md-3">
                    <WFormControl name="dni">
                        <TemplateInputContainer label="DNI">
                            <WInputText />
                        </TemplateInputContainer>
                    </WFormControl>
                </div>

                <div className="p-md-3">
                    <button type="submit"> Buscar</button>
                </div>
            </div>
        </WForm>
    </>)
}