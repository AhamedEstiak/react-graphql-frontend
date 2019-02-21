import React, { Component } from 'react';
import { Mutation, Query } from "react-apollo";
import gql from "graphql-tag";
import Router from 'next/router';
import Form from "../components/styles/Form";
import Error from "../components/ErrorMessage";

const SINGLE_ITEM_QUERY = gql`
    query SINGLE_ITEM_QUERY ($id: ID!) {
        item(where: { id: $id }) {
            id
            title
            description
            price
        }
    }
`;

const UPDATE_ITEM_MUTATION = gql`
    mutation UPDATE_ITEM_MUTATION (
        $id: ID!
        $title: String
        $description: String
        $price: Int
    ) {
        updateItem(id: $id, title: $title, description: $description, price: $price) {
         id  
         title 
         description
         price
        }
    }
`;

class UpdateItem extends Component {
    state = {
    }

    handleChange = (e) => {
        const { type, name, value } = e.target;
        const val = type === "number" ? parseFloat(value) : value;
        this.setState({
            [name]: val
        })
    };

    handleSubmit = async (e, updateItemMutation) => {
        e.preventDefault();
        console.log('updating...');
        console.log(this.state);
        const res = await updateItemMutation({
            variables: {
                id: this.props.id,
                ...this.state
            }
        });
        console.log(res);
        // Router.push({
        //     pathname: '/item',
        //     query: { id: res.data.createItem.id }
        // })
    };

  render() {
    return (
        <Query query={SINGLE_ITEM_QUERY} variables={{
            id: this.props.id
        }}>
        {({data, loading}) => {
            console.log(data);
            if (loading) return <p>Loading...</p>
            if (!data.item) return <p>No item found for ID {this.props.id}</p>
            return (
                <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
                {(updateItem, { loading, error }) => (
                    <Form onSubmit={e => this.handleSubmit(e, updateItem)}>
                    <Error error={error} /> 
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="title">
                        Title
                        <input 
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        defaultValue={data.item.title}
                        required
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
                        defaultValue={data.item.price}
                        required
                        onChange={this.handleChange}
                        />
                        </label>
                        <label htmlFor="description">
                        Description
                        <textarea 
                        id="description"
                        name="description"
                        placeholder="Description"
                        defaultValue={data.item.description}
                        required
                        onChange={this.handleChange}
                        />
                        </label>
                        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
                    </fieldset>
                </Form>
                )}
            </Mutation>
            )}}

        </Query>
        
    )
  }
}

export default  UpdateItem;
export { UPDATE_ITEM_MUTATION };