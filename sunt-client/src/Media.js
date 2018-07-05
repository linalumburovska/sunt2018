import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel';

export class Media extends Component {
    constructor(props){
        super(props);

        this.generateCarousel = this.generateCarousel.bind(this);
    }

    generateCarousel(data){
        return data.map((item, key) => {
            if(item !== null && item["0"] !== null && item["0"].path !== null){
                let imgSrc = item[0].path;
                let alt = item[0].alt;
                return(
                    <div key={key}>
                        <img src={imgSrc}/>
                        <p className="legend">{alt}</p>
                    </div>
                );
            }
        })
    }

    render() {
        console.log("Media", this.props);
        return (
            <Carousel>
                {this.generateCarousel(this.props)}
            </Carousel>
        );
    }
}