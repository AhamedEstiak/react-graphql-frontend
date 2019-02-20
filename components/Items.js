import React, {Component} from "react";
import {Query} from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from "./Item";

const GET_ALL_ITEMS_QUERY = gql`
    query GET_ALL_ITEMS_QUERY {
        items {
            id
            title
            description
            price
            image
            largeImage
        }
    }
`;

const CenterStyle = styled.div`
  text-align: center;
`;

const ItemList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Items extends Component {
    render() {
        return (
            <CenterStyle>
                <Query query={GET_ALL_ITEMS_QUERY}>
                    {({loading, error, data}) => {
                        if (loading) return <p>loading...</p>;
                        if (error) return <p>Error: {error.message}</p>;

                        return (
                            <ItemList>
                                {data.items.map(item => (
                                    <Item key={item.id} item={item}/>
                                ))}
                            </ItemList>
                        );
                    }}
                </Query>
            </CenterStyle>
        );
    }
}

export default Items;
