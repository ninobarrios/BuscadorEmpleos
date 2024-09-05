import React from 'react';
import Select from 'react-select';

function Selectores({ onSelectLugar, onSelectEmpresa, empresas, lugar, empresa, departamentos }) {
    // Opciones para react-select
    const defaultLugarOption = { value: '', label: 'Departamentos' };
    const defaultEmpresaOption = { value: '', label: 'Empresas' };

    const lugaresOptions = [defaultLugarOption, ...departamentos.map(dep => ({ value: dep, label: dep }))];
    const empresasOptions = [defaultEmpresaOption, ...empresas.map(emp => ({ value: emp, label: emp }))];

    return (
        <div className='selectores'>
            <Select
                className='select-lugar'
                options={lugaresOptions}
                value={lugaresOptions.find(option => option.value === lugar) || defaultLugarOption}
                onChange={(selectedOption) => onSelectLugar(selectedOption.value)}
                placeholder="Selecciona un lugar"
            />

            <Select
                className='select-lugar'
                options={empresasOptions}
                value={empresasOptions.find(option => option.value === empresa) || defaultEmpresaOption}
                onChange={(selectedOption) => onSelectEmpresa(selectedOption.value)}
                placeholder="Selecciona una empresa"
            />
        </div>
    );
}

export default Selectores;

