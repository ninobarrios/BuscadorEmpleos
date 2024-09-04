import React from 'react';

function Selectores({ onSelectLugar, onSelectEmpresa, empresas, lugar, empresa, departamentos }) {
    return (
        <div className='selectores'>
            <select
                className='select-empresa'
                value={lugar}
                onChange={(e) => onSelectLugar(e.target.value)}
            >
                <option className='empresaselects' value="lugar">Todos los lugares</option>
                {departamentos.map((dep, index) => (
                    <option key={index} value={dep}>{dep}</option>
                ))}
            </select>

            <select
                className='select-empresa'
                value={empresa}
                onChange={(e) => onSelectEmpresa(e.target.value)}
            >
                <option className='empresaselects' value="empresa">Todas las empresas</option>
                {empresas.map((emp, index) => (
                    <option key={index} value={emp}>{emp}</option>
                ))}
            </select>
        </div>
    );
}

export default Selectores;
