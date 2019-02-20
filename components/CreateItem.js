import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "../components/styles/Form";

class CreateItem extends Component {
    state = {
        title: '',
        price: '',
        description: '',
    }

    handleChange = (e) => {
        const { type, name, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({
            [name]: val
        })
    };

  render() {
    return (
      <Form>
        <fieldset>
            <label htmlFor="title">
            Title
            <input 
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChange}
            />
            </label>
            <label htmlFor="price">
            Price
            <input 
            type="text"
            id="price"
            name="price"
            placeholder="Price"
            value={this.state.price}
            onChange={this.handleChange}
            />
            </label>
            <label htmlFor="description">
            Description
            <textarea 
            id="description"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleChange}
            />
            </label>
        </fieldset>
      </Form>
    )
  }
}

export default  CreateItem;