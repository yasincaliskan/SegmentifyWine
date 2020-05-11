import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import sample_products from "./sample_products.json";
import { Card } from "react-bootstrap";
import { GrNew } from "react-icons/gr";
import { FcLike } from "react-icons/fc";
import { IoMdPricetag } from "react-icons/io"


var width = window.innerWidth;
var pageSize = filterPageSize(width);
window.addEventListener("resize", function () {
    width = window.innerWidth;
    var isStateChanged = filterPageSize(width) !== pageSize ? true : false;

    if (isStateChanged) { this.location.reload(); }
    console.log(width);
});

function filterPageSize(width) {
    var p = 5;
    if (width < 600) {
        p = 1;
    } else if (width > 600 && width < 800) {
        p = 2;
    } else if (width > 800 && width < 1200) {
        p = 3;
    } else if (width > 1200 && width < 1400) {
        p = 4;
    } else {
        p = 5;
    }
    return p;
}

export default () => {
    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const chevronWidth = 40;
    return (
        <div style={{ padding: `0 ${chevronWidth}px` }}>
            <ItemsCarousel className="mediaQuery" xs="12" sm="6" ml="8"
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={pageSize}
                gutter={20}
                leftChevron={<button>{'<'}</button>}
                rightChevron={<button>{'>'}</button>}
                outsideChevron
                chevronWidth={chevronWidth}
            >
                {sample_products.map(data =>
                    <Card className="responsiveCard" key={data.productId}>
                        <Card.Img className="cardImage" variant="top" src={data.image} />
                        <Card.Body>
                            <Card.Title>{data.name}</Card.Title>
                            <Card.Text>{data.params.rebsorte}</Card.Text>
                            <Card.Text>
                                {data.params.isNew ? <small><GrNew /> NEW! </small> : null}
                                {data.params.likeCount > 0 ? <small><FcLike /> {data.params.likeCount} </small> : null}
                                {data.oldPrice != null ? <small><IoMdPricetag />-{Math.trunc((data.oldPrice - data.price) / data.oldPrice * 100)}%</small> : null}
                            </Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <Card.Text>
                                {data.priceText} <small style={{ textDecorationLine: 'line-through', textDecorationStyle: 'solid', color: 'gray' }}>
                                    {data.oldPriceText}
                                </small>
                            </Card.Text>
                            <Card.Text>
                                <small style={{ color: 'gray' }}>{data.params.basePrice}</small>
                            </Card.Text>
                        </Card.Footer>
                    </Card>
                )}
            </ItemsCarousel>
        </div>
    );
};