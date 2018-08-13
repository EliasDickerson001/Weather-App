import React from 'react';
export const SearchForm = (props) => {
    return (
        // <div>
        //     <input type="text" onChange={props.onChange}/>
        //     <button onClick={props.onSearch}>Search</button>
        // </div>
        <form onSubmit={props.onSearch}>
            <input type="text" onChange={props.onChange}/>
            <input type="submit" value="Search"/>
        </form>
    );
}