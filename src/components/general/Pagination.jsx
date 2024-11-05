//import pagination
import Pagination from "react-js-pagination";

function definePagination(props) {
    return (
        props.total > 0 && (
            <Pagination
                innerClass={`pagination pagination-sm justify-content-${props.position} mb-0 mt-3`}
                activePage={props.currentPage}
                activeClass="page-item active"
                itemsCountPerPage={props.perPage}
                totalItemsCount={props.total}
                onChange={props.onChange}
                itemClasss="page-item"
                linkClass="page-link"
            />
        )
    );
}

export default definePagination;