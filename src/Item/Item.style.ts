import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 15px;
    height: 100%;

    button {
        border-radius: 0 0 15px 15px;
    }

    img { 
        max-height: 100%;
        object-fit: cover;
        border-radius: 15px 15px 0 0;
    }

    div {
        font-family: Arial, Helvetica, sans-serif;
        padding: 1rem;
        height: 100%;
    }
`;