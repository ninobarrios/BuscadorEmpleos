import React from 'react';
import Select from 'react-select';

function Selectores({ onSelectLugar, onSelectEmpresa, empresas, lugar, empresa, departamentos }) {
    // Opciones para react-select
    const defaultLugarOption = { value: '', label: 'Todos los Departamentos' };
    const defaultEmpresaOption = { value: '', label: 'Todas las Empresas' };

    const lugaresOptions = [defaultLugarOption, ...departamentos.map(dep => ({ value: dep, label: dep }))];
    const empresasOptions = [defaultEmpresaOption, ...empresas.map(emp => ({ value: emp, label: emp }))];

    // Estilos personalizados
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            borderColor: state.isFocused ? '#47b72f' : '#d0d0d0', // Color verde cuando está enfocado, gris cuando no lo está
            boxShadow: state.isFocused ? '0 0 0 1px #47b72f' : null, // Sombra verde cuando está enfocado
            '&:hover': {
                borderColor: '#47b72f', // Borde verde cuando está en hover
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#47b72f' : state.isFocused ? '#e0f7e9' : provided.backgroundColor, // Fondo verde cuando está seleccionado, verde claro cuando está enfocado
            color: state.isSelected ? 'white' : provided.color,
            '&:hover': {
                backgroundColor: '#e0f7e9', // Fondo verde claro cuando se pasa el mouse por encima
            },
        }),
    };

    return (
        <div className='selectores'>
            <Select
                className='select-lugar'
                styles={customStyles}
                options={lugaresOptions}
                value={lugaresOptions.find(option => option.value === lugar) || defaultLugarOption}
                onChange={(selectedOption) => onSelectLugar(selectedOption.value)}
                placeholder="Selecciona un lugar"
            />

            <Select
                className='select-lugar'
                styles={customStyles}
                options={empresasOptions}
                value={empresasOptions.find(option => option.value === empresa) || defaultEmpresaOption}
                onChange={(selectedOption) => onSelectEmpresa(selectedOption.value)}
                placeholder="Selecciona una empresa"
            />
        </div>
    );
}

export default Selectores;
