import queryString from "query-string";
import { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Subject } from "rxjs";
import { map, startWith } from "rxjs/operators";

export const useQueryParams$ = () => {
    const history = useHistory();
    const searchParams$Ref = useRef(new Subject());
    const searchParams$ = searchParams$Ref.current;
    useEffect(() => {
        if (!history) return;
        const unsubcribe = history.listen((location) => {
            searchParams$.next(location.search);
        });
        return () => {
            unsubcribe();
        };
    }, [history, searchParams$]);

    return searchParams$.pipe(
        startWith(window.location.search),
        map((search) => queryString.parse(search as string)
        )
    );
};
