import React from "react";
import ReactDOM from "react-dom";
import ApolloClient, { gql } from "apollo-boost";
import { ApolloProvider, Mutation ,Query} from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:1337/graphql"
});

const GET_TODOS = gql`
  query {
    todos{
    id
    dianzan
    }
  }
`;

const UPDATE_TODO = gql`
 mutation updateTodo($input: updateTodoInput) {
        updateTodo(input: $input) {
            todo {
                id
                dianzan
            }
        }
    }
`;

function App() {
  return (
    <Query query={GET_TODOS}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.todos.map(({ id, dianzan }) => {
          let input;

          return (
            <Mutation mutation={UPDATE_TODO} key={id}>
              {updateTodo => (
                <div>
                  <p>{dianzan}</p>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      console.log("----------------------print---------------------------")
                      console.log( input.value )
                      console.log(id)
                      updateTodo({
                        variables: {
                          input: {
                            where: {
                              id: id
                            },
                            data: {
                              dianzan: "qwq"
                            }
                          }
                        }
                      });

                      input.value = "";
                    }}
                  >
                    <input
                      ref={node => {
                        input = node;
                      }}
                    />
                    <button type="submit">Update Todo</button>
                  </form>
                </div>
              )}
            </Mutation>
          );
        });
      }}
    </Query>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
