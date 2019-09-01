import React, {useEffect} from 'react';
import {useHttp} from "../hooks/http";
import Summary from './Summary';

const Character = props => {

    console.log("Rendering....");

    const [isLoading, fetchedData] = useHttp('https://swapi.co/api/people/' + props.selectedChar, [props.selectedChar]);

    let loadedCharacter = null;
    if (fetchedData) {
        loadedCharacter = {
            id: props.selectedChar,
            name: fetchedData.name,
            height: fetchedData.height,
            colors: {
                hair: fetchedData.hair_color,
                skin: fetchedData.skin_color
            },
            gender: fetchedData.gender,
            movieCount: fetchedData.films.length
        }
    }

    useEffect(() => {
        console.log("this will run twice, once as\"component did mount\"  and once when the component is destroyed ");
        return () => {
            console.log("this will run when component unmounts ")
        }
    }, []);

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
        content = (
            <Summary
                name={loadedCharacter.name}
                gender={loadedCharacter.gender}
                height={loadedCharacter.height}
                hairColor={loadedCharacter.colors.hair}
                skinColor={loadedCharacter.colors.skin}
                movieCount={loadedCharacter.movieCount}
            />
        );
    } else if (!isLoading && !loadedCharacter) {
        content = <p>Failed to fetch character.</p>;
    }
    return content;
};


// shouldComponentUpdate(nextProps, nextState)
// {
//     console.log('shouldComponentUpdate');
//     return (
//         nextProps.selectedChar !== props.selectedChar ||
//         nextState.loadedCharacter.id !== loadedCharacter.id ||
//         nextState.isLoading !== isLoading
//     );
// }

//React Memo can be used to replace shouldComponentUpate. it takes a component and a function, that when it return false the component rerenders
export default React.memo(Character, (prevProps, nextProps) => {
    //Note this is a redundent code as react already re-renders when the props is changed
    return (
        nextProps.selectedChar === prevProps.selectedChar
    );
});
