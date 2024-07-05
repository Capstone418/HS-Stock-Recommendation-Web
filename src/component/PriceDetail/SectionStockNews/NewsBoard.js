import React,{useEffect,useState} from "react";
import axios from "axios";
import {MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import Card from "react-bootstrap/Card";
import ItemNews from "./ItemNews";
import NewsBoardPagination from "./NewsBoardPagination";

function NewsBoard(props) {
    const [newsData, setNewsData] = useState([])

    useEffect(() => {
        axios.get(`/api/price-detail`)
            .then(response => {
                const filteredNews = response.data.filter(item => item.code === props.stockFilter);
                setNewsData(filteredNews);
            })
            .catch(error => {
                console.log('Error fetching data[StockGPTCard]:', error);
            });
    }, [props.stockFilter]);

    //console.log('######')
    //console.log(newsData)

    const [page, setPage] = useState(1);
    const limit = 5; // 뉴스기사 보일 최대 개수
    const offset = (page-1)*limit; // 시작점,종료점

    const sliceNewsData = (items) => {
        return items.slice(offset,offset+limit);
    }

    return (
        <Card style={{width: "60%", height:"840px"}}>
            <Card.Header className={"text-center"}><strong>관련 뉴스</strong></Card.Header>
            <Card.Body>
                <MDBTable align={"middle"} hover>
                    <MDBTableHead>
                        <tr className={"table-light"}>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}>제목</th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}></th>
                            <th scope={"col"}>출처</th>
                            <th scope={"col"} className={"text-center"}>날짜</th>
                            <th scope={"col"} className={"text-center"}>버튼</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <ItemNews data={sliceNewsData(newsData)}/>
                    </MDBTableBody>
                </MDBTable>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <NewsBoardPagination
                        limit={limit} page={page}
                        totalSize={newsData.length} setPage={setPage}
                    />
                </div>
            </Card.Body>
        </Card>
    );
}

export default NewsBoard;