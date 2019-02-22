import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import Error from './ErrorMessage';
import { perPage } from '../config'

const PAGINATION_QUERY = gql`
    query PAGINATION_QUERY {
        itemsConnection {
            aggregate {
                count
            }
        }
    }
`;

const Pagination = props => {
  return (
      <Query query={PAGINATION_QUERY}>
      {({loading, error, data}) => {
          if (loading) return <p>Loading ...</p>;
          if (error) return <Error error={error} />
          const count = data.itemsConnection.aggregate.count;
          const pages = Math.ceil(count / perPage);
          const { page } = props;
          return (
            <PaginationStyles>
                <Head>
                    <title>Sick fits! Page {page} of {pages}</title>
                </Head>
                <Link
                    prefetch
                    href={{
                        pathname: 'items',
                        query: { page: page - 1}
                    }}>
                    <a className="prev" aria-disabled={page <= 1}> Prev Page</a>
                </Link>
                <p>Page {props.page} of {pages}</p>
                <p>{count} items total</p>
                <Link 
                    prefetch
                    href={{
                        pathname: 'items',
                        query: { page: page + 1}
                    }}>
                    <a className="prev" aria-disabled={page >= pages}>  Next Page  </a>
                </Link>
            </PaginationStyles>
          )
      }}
    </Query>
  )
};

export default Pagination;
