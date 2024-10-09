import React from 'react';
import Select from 'react-select';
import './estiloscomponentes.css'

function Selectores({ onSelectLugar, onSelectEmpresa, empresas, lugar, empresa, departamentos }) {
    // Opciones para react-select
    const defaultLugarOption = { value: '', label: 'Todos los Departamentos' };
    const defaultEmpresaOption = { value: '', label: 'Todas las Empresas' };

    const lugaresOptions = [defaultLugarOption, ...departamentos.map(dep => ({ value: dep, label: dep }))];

    // Filtra empresas vacías antes de crear las opciones
    const empresasOptions = [
        defaultEmpresaOption, 
        ...empresas
            .filter(emp => emp && emp.trim() !== '') // Filtra las empresas vacías o que solo tienen espacios
            .map(emp => ({ value: emp, label: emp }))
    ];

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#47b72f' : '#d0d0d0', 
            boxShadow: state.isFocused ? '0 0 0 1px #47b72f' : null, 
            '&:hover': {
                borderColor: '#47b72f', 
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#47b72f' : state.isFocused ? '#e0f7e9' : provided.backgroundColor, 
            color: state.isSelected ? 'white' : provided.color,
            '&:hover': {
                backgroundColor: '#e0f7e9', 
            },
        }),
    };

    return (
<div className='selectores'>
    <Select
        id="select-lugar"
        className='select-lugar'
        styles={customStyles}
        options={lugaresOptions}
        value={lugaresOptions.find(option => option.value === lugar) || defaultLugarOption}
        onChange={(selectedOption) => onSelectLugar(selectedOption.value)}
        placeholder="Selecciona un lugar"
        aria-label="Selecciona un lugar" 
    />

    <Select
        id="select-empresa"
        className='select-lugar'
        styles={customStyles}
        options={empresasOptions}
        value={empresasOptions.find(option => option.value === empresa) || defaultEmpresaOption}
        onChange={(selectedOption) => onSelectEmpresa(selectedOption.value)}
        placeholder="Selecciona una empresa"
        aria-label="Selecciona una empresa" 
    />
</div>

    );
}

export default Selectores;
