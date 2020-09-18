import React from 'react';
import './Button.css';

export default ({
    operation, 
    double, 
    triple, 
    label, 
    click,
}) =>
    <button className={`
        button
        ${operation ? 'operation' : ''} 
        ${double ? 'double' : ''} 
    `}
    // Primeiro verifica se o props click existe depois chama a funcao 
    onClick={e => click && click(label)}>
        {label}
    </button>