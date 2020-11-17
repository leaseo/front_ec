import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = "http://localhost:3000/api/v1/";
const cookies = new Cookies();

export class GridData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: []
        }
    }

    refreshList() {
        this.setState({
            gridData: []
        })
    }

    componentDidMount() {
        if(cookies.get('user')) {
            this.getGridData();
        } else {
            window.location.href = './';
        }
    }

    getGridData = async () => {
        let url = baseUrl + 'data/gridData';
        let token = cookies.get('token');
        await axios(url, { 
            method: 'POST', 
            headers: { 'content-type': 'application/json', 'authorization': token },
        }).then(response => {
            this.setState({
                gridData: response.data
            });
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        const { gridData } = this.state;
        return (
            <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>UserId</th>
                        <th>Title</th>
                        <th>Body</th>
                    </tr>
                </thead>
                <tbody>
                    {gridData.map(data => 
                       <tr key={data.id}> 
                            <td>{data.id}</td>
                            <td>{data.userId}</td>
                            <td>{data.title}</td>
                            <td>{data.body}</td>
                       </tr> 
                    )}
                </tbody>
            </Table>
        )
    }
}

export default GridData;