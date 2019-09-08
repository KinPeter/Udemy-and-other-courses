import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const { onLoadIngredients } = props;
    const dbUrl = 'https://react-my-burger-eae6f.firebaseio.com/hooks/ingredients.json';
    const [enteredFilter, setEnteredFilter] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (enteredFilter === inputRef.current.value) {
                const query = !enteredFilter.length ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
                const response = await fetch(dbUrl + query);
                const data = await response.json();
                const loadedIngredients = [];
                Object.keys(data).forEach((key) => {
                    loadedIngredients.push({
                        id: key,
                        title: data[key].title,
                        amount: data[key].amount
                    });
                });
                onLoadIngredients(loadedIngredients);
            }
        }, 500);

        // useEffect can return a "cleanup function" which will run BEFORE the next useEffect runs
        return () => {
            clearTimeout(timer);
        };
    }, [enteredFilter, onLoadIngredients, inputRef])

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input
                        ref={inputRef}
                        type="text"
                        value={enteredFilter}
                        onChange={event => setEnteredFilter(event.target.value)} />
                </div>
            </Card>
        </section>
    );
});

export default Search;
