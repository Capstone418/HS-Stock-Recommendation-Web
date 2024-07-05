import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import SearchBar from "../../../layer/SearchBar";
import {MDBTable, MDBTableHead, MDBTableBody} from "mdb-react-ui-kit";
import ItemsTableBody from "./ItemsTableBody";
import ItemMiniChart from "./ItemMiniChart";
import ItemAnalysis from "./ItemAnalysis";

function TableBoard(props){
    const [stocksData, setStocksData] = useState([]);
    const [code, setCode] = useState("KRX:005930");
    const [key, setKey] = useState(0);

    useEffect(() => {
        axios.get("/api/price-menu/res")
            .then(response => {
                console.log(1111111111111111);
                setStocksData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data[TableBoard]:', error);
            });
    }, []);

    //console.log("##### TableBoard ######")
    //console.log(stocksData)

    const handleSearch = (reqStocksData) => {
        setStocksData(reqStocksData);
    };

    const handleRowClick = (code) => {
        setCode(code);
        //window.location.reload();
        setKey(prevKey => prevKey + 1);
    };

    return (
        <div style={{width: "60%", marginTop:"100px"}}>
            <Card style={{height:"830px"}}>
                <Card.Header className={"text-center"} style={{background:"#d7d4d4"}}><strong>종목 목록</strong></Card.Header>
                <Card.Body className={"text-center"}>
                    <SearchBar url={"/api/price-menu/req"} name={"stockName"} barWidth={"65%"} onSearch={handleSearch}/>
                    <div style={{
                        width: "100%",
                        height: "440px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <div style={{
                            width: "50%",
                            height: "390px",
                            marginRight: "10px",
                            marginLeft: "5px",
                            marginTop: "10px"
                        }}>
                            <div style={{
                                overflowX: "auto",
                                maxHeight: "611px",
                                border: "1px solid lightgray",
                                borderRadius: "5px"
                            }}>
                                <MDBTable align={"middle"} hover>
                                    <MDBTableHead>
                                        <tr className={"table-secondary"}>
                                            <th scope={"col"}>종목명</th>
                                            <th scope={"col"}>코드</th>
                                            <th scope={"col"}>시가</th>
                                            <th scope={"col"}>종가</th>
                                            <th scope={"col"}>거래량</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        <ItemsTableBody datas={stocksData} onRowClick={handleRowClick}/>
                                    </MDBTableBody>
                                </MDBTable>
                            </div>
                        </div>
                        <div style={{width: "50%", height: "380px", marginRight: "5px"}}>
                            <div style={{height: "50%", marginBottom: "50px"}}>
                                <ItemMiniChart key={key} stock={code}/>
                            </div>
                            <div style={{height: "50%"}}>
                                <ItemAnalysis key={key} stock={code}/>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default TableBoard;