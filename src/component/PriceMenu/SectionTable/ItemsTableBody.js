import React from "react";
import Spinner from "react-bootstrap/Spinner";

function ItemsTableBody(props) {
    const handleRowClick = (code) => {
        props.onRowClick(code);
    };

    return (
        <>
            {
                props.datas.length !== 0 ? props.datas.map(item => {
                    return (
                        <tr id={`KRX:${item.code}`} onClick={() => handleRowClick(`KRX:${item.code}`)}>
                            <td>{item.company}</td>
                            <td>{item.code}</td>
                            <td>{item.open}</td>
                            <td>{item.close}</td>
                            <td>{item.volume}</td>
                        </tr>
                    )
                }) : (
                    <tr>
                        <td colSpan={5} className={"text-center"}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </td>
                    </tr>
                )
            }
        </>
    );
}

export default ItemsTableBody;