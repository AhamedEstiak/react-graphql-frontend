import React, { Component } from 'react';
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Router from 'next/router';
import Form from "../components/styles/Form";
import Error from "../components/ErrorMessage";

const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION (
        $title: String!
            $description: String!
            $price: Int!,
            $image: String
            $largeImage: String
    ) {
        createItem(
            title: $title 
            description: $description 
            price: $price 
            image: $image 
            largeImage: $largeImage 
        ) {
         id   
        }
    }
`;

class CreateItem extends Component {
    state = {
        title: 'Best shoes',
        price: '100',
        description: 'Love this shoes',
        image: 'dog.jpg',
        largeImage: 'large-dog.jpg'
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
        <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
            <Form onSubmit={async (e) => {
                // Stop the form from submitting
              e.preventDefault();
            //   call the mutation
            const res = await createItem();
            // Change them to the single item page
            console.log(res);
            Router.push({
                pathname: '/item',
                query: { id: res.data.createItem.id }
            })
          }
      }>
      <Error error={error} /> 
        <fieldset disabled={loading} aria-busy={loading}>
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
            <button type="submit">Submit</button>
        </fieldset>
      </Form>
        )}
      
      </Mutation>
    )
  }
}

export default  CreateItem;