import React from 'react';

const Context = React.createContext();

const change = (state, value) => {
    return{...state, index:value};
};

export class IndexProvider extends React.Component{
    state = {
        index: 1,
        change: value => {
            this.setState(state => change(state, value));
        }
    };
    render(){
        const {state, props:{ children }} = this;
        return <Context.Provider value={state}>{children}</Context.Provider>;
    }
}

export const IndexConsumer = Context.Consumer;