import React, {useState} from "react";
import styled from "styled-components";
import Button from "react-bootstrap/Button";

const PaginationButton = styled(Button)`
    background-color: #fff;
    border-color: #fff;
    color: #333;
    padding: 5px 10px;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f0f0f0; /* 옅은 회색 */
        color: #000000;
    }

    &:disabled {
        background-color: #ddd; /* 회색 */
        border-color: #ddd;
        color: #666;
        cursor: not-allowed;
    }

    &[aria-current="page"] {
        background-color: rgba(171, 166, 166, 0.55); /* 옅은 회색 */
    }
`;

function NewsBoardPagination({page, totalSize, limit, setPage}) {
    const numPages = Math.ceil(totalSize/limit)
    const [curPage, setCurPage] = useState(page)
    let firstNum = curPage - (curPage % 5) + 1
    let lastNum = curPage - (curPage % 5) + 5

    return (
        <div>
            <PaginationButton onClick={() => {setPage(page-1); setCurPage(page-2)}} disabled={page===1}>
                &lt;
            </PaginationButton>
            <PaginationButton onClick={() => setPage(firstNum)} aria-current={page===firstNum ? "page":null}>
                {firstNum}
            </PaginationButton>
            {Array(4).fill().map((_,i) => {
                if(i<=2) {
                    return (
                        <PaginationButton border={"true"} key={i+1} onClick={() => {setPage(firstNum+1+i)}}
                            aria-current={page === firstNum+1+i ? "page":null}>
                            {firstNum+1+i}
                        </PaginationButton>
                    )
                }
                else if(i>=3) {
                    return (
                        <PaginationButton border={"true"} key={i+1} onClick={() => {setPage(lastNum)}}
                            aria-current={page===lastNum ? "page":null}>
                            {lastNum}
                        </PaginationButton>
                    )
                }
                return null;
            })}
            <PaginationButton onClick={() => {setPage(page+1); setCurPage(page);}} disabled={page===numPages}>
                &gt;
            </PaginationButton>
        </div>
    );
}

export default NewsBoardPagination;