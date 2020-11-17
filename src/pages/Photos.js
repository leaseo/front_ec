import React, { Component } from 'react';
import { Card, CardColumns, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Pagination from './Pagination';

const baseUrl = "http://localhost:3000/api/v1/";
const cookies = new Cookies();

export class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            photosData: [],
            totalPages: 1
        };
    }

    componentDidMount() {
        const { page } = this.state;
        if(cookies.get('user')) {
            this.getPhotosData(page);
        } else {
            window.location.href = './';
        }
    }

    getPhotosData = async (page) => {
        let url = baseUrl + 'data/imageData';
        let token = cookies.get('token');
        await axios(url, { 
            method: 'POST', 
            headers: { 'content-type': 'application/json', 'authorization': token },
            data:{
                page: page - 1
            }
        }).then(response => {
            this.setState({
                photosData: response.data.data,
                totalPages: response.data.totalPages
            });
            console.log(this.state.photosData);
        }).catch(err => {
            console.log(err);
        })
    }

    setPage(pageNumber) {
        this.setState({page: pageNumber})
        this.getPhotosData(pageNumber);
      }

    render() {
        const { photosData, totalPages, page } = this.state;
        const paginate = pageNumber => this.setPage(pageNumber);
        return (
            <div className="content">
                <Row key={1}>
                    <CardColumns>
                        {photosData.map(image => 
                            <Card key={image.id} >
                                <Card.Img variant="top" src={image.url} />
                                <Card.Body>
                                    <Card.Title>{image.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        )}
                    </CardColumns>
                </Row>
                <Row key={2}>
                    <Col xs={{size:4, offset:4}}>
                        <Pagination totalPages={totalPages} paginate={paginate} selected={page}></Pagination>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Photos;