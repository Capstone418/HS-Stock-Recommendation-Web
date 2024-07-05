import React, {useState,useEffect} from "react";
import {MDBCarousel, MDBCarouselItem, MDBRow} from "mdb-react-ui-kit";
import Card from "react-bootstrap/Card";
import axios from "axios";
import NewsCard from "./NewsCard";

function SectionCardBoardNews(props) {
    const [news, setNews]=useState([]);

    useEffect(() => {
        axios.get('/api/home/news')
            .then(response => {
                setNews(response.data);
            })
            .catch(error => {
                console.error('Error fetching data[SectionCardBoardNews]:', error);
            });
    }, []);

    console.log(news)

    return (
        <Card className="text-center" style={{
            width:`${props.stylewidth}`,
            height:`${props.styleheight}`
        }}>
            <Card.Header style={{background:"#d7d4d4"}}>
                <strong>{props.cardHeader}</strong>
            </Card.Header>
            <Card.Body>
                <MDBCarousel showControls dark fade interval={10000}>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={1}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(0,3).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                score={item.score} summary={item.summary} content={item.content}
                                keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                keyword4={item.keyword4} keyword5={item.keyword5}
                                image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={2}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(3,6).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={3}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(6,9).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={4}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(9,12).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={5}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(12,15).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={6}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(15,18).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={7}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(18,21).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={8}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(21,24).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                    <MDBCarouselItem className={"w-100 d-block"} itemId={9}>
                        <MDBRow className={"row-cols-1 row-cols-md-3 g-4"}>
                            {news.slice(24,27).map(item => (
                                <NewsCard code={item.code} date={item.date} title={item.title}
                                          score={item.score} summary={item.summary} content={item.content}
                                          keyword1={item.keyword1} keyword2={item.keyword2} keyword3={item.keyword3}
                                          keyword4={item.keyword4} keyword5={item.keyword5}
                                          image={item.image} url={item.url}/>
                            ))}
                        </MDBRow>
                    </MDBCarouselItem>
                </MDBCarousel>
            </Card.Body>
        </Card>
    );
}

export default SectionCardBoardNews;