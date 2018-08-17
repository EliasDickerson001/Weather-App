import React from 'react';
export const SearchForm = (props) => {
    return (
        <form onSubmit={props.onSearch}>
            <input type="text" onChange={props.onChange}/>
            <input type="submit" value="Search"/>
        </form>
    );
}