"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[280,210,757,357],{1669:(a,e,i)=>{i.d(e,{A:()=>s});var n=i(5043),o=i(6213),r=(i(2845),i(579));const s=function(a){let{onBuscar:e,onSugerencias:i}=a;const[s,l]=(0,n.useState)(""),[c,t]=(0,n.useState)([]),[d,u]=(0,n.useState)(!1),m=(0,n.useRef)(null),g=(0,n.useRef)(null),b=a=>{m.current&&!m.current.contains(a.target)&&g.current&&!g.current.contains(a.target)&&u(!1)};return(0,n.useEffect)((()=>(document.addEventListener("mousedown",b),()=>{document.removeEventListener("mousedown",b)})),[]),(0,r.jsxs)("div",{className:"buscador",children:[(0,r.jsxs)("h3",{children:["Buscar Oferta ",(0,r.jsx)("span",{style:{color:"#47b72f"},children:"Laboral"})]}),(0,r.jsxs)("div",{className:"elementos_buscador",children:[(0,r.jsxs)("div",{ref:m,children:[(0,r.jsx)("input",{className:"input_cajainiciobox",type:"text",value:s,onChange:a=>{const e=a.target.value;l(e),(async a=>{if(a.length>2)try{const e=(await o.A.get("https://buscadorempleos.onrender.com/sugerencias",{params:{palabra:a}})).data;t(e),u(e.length>0),i&&i(e)}catch(e){console.error("Error fetching suggestions:",e),t([]),u(!1)}else t([]),u(!1)})(e)},onKeyPress:a=>{"Enter"===a.key&&e(s)},placeholder:"Ingrese palabra clave"}),d&&(0,r.jsx)("ul",{className:"sugerencias",ref:g,children:c.map(((a,i)=>(0,r.jsx)("li",{onClick:()=>(a=>{console.log("Sugerencia seleccionada:",a),l(a),u(!1),e&&e(a)})(a),children:a},i)))})]}),(0,r.jsx)("button",{className:"btn_cajainiciobox",onClick:()=>e(s),children:"Buscar"})]})]})}},975:(a,e,i)=>{i.r(e),i.d(e,{default:()=>g});var n=i(5043);const o=i.p+"static/media/ubi.381e01962d1d771f7578.avif",r=i.p+"static/media/indeed.708aabb0e5fccb081ace.png",s=i.p+"static/media/convocatorias_2024.87d2813e805aa79dadb9.avif",l=i.p+"static/media/buscojobs.57c803c072acafb898ff.avif",c=i.p+"static/media/Linkedin.92add2ab69097c8b6b50.avif",t=i.p+"static/media/computrabajo.8e04e9b4b2d6b67dc02e.avif",d=i.p+"static/media/bumeran.2e777f8a6deebff57aa4.avif";i(2845);var u=i(579);const m={Indeed:r,"Convocatorias de Trabajo":s,Buscojobs:l,Linkedin:c,Computrabajo:t,Bumeran:d},g=a=>{let{oferta_laboral:e}=a;const[i,r]=(0,n.useState)(!1),s=a=>a?a.split(" ").map((a=>a.charAt(0).toUpperCase()+a.slice(1).toLowerCase())).join(" "):"",l=m[e.plataforma];return(0,u.jsxs)("div",{className:"boxcajaoferta",children:[(0,u.jsx)("h2",{children:s(e.nom_oferta)}),(0,u.jsx)("div",{className:"division"}),(0,u.jsx)("div",{className:"empresa",children:(0,u.jsx)("h3",{children:s(e.nom_empresa)})}),(0,u.jsxs)("div",{className:"lugar",children:[(0,u.jsx)("img",{src:o,alt:"Ubicaci\xf3n"}),(0,u.jsx)("h3",{children:e.lugar})]}),(0,u.jsx)("div",{className:"foto_plataforma",children:l&&(0,u.jsx)("img",{src:l,alt:"Logo ".concat(e.plataforma)})}),(0,u.jsx)("button",{className:"btn-official",onClick:a=>{a.stopPropagation(),"Computrabajo"===e.plataforma?navigator.clipboard.writeText(e.link_pagina).then((()=>{r(!0),setTimeout((()=>r(!1)),2e3)})).catch((a=>console.error("Error al copiar el enlace",a))):window.open(e.link_pagina,"_blank")},children:"Computrabajo"===e.plataforma?"Copiar enlace":"Postular aqu\xed"}),i&&(0,u.jsx)("div",{style:{backgroundColor:"#48b72f",color:"white",padding:"20px",borderRadius:"5px",position:"fixed",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:1e3,transition:"opacity 0.5s",opacity:i?1:0},children:"\xa1Enlace Copiado!"})]})}},7357:(a,e,i)=>{i.r(e),i.d(e,{default:()=>o});i(5043),i(2845);var n=i(579);const o=function(){return(0,n.jsx)("div",{className:"footer",children:"\xa9 Practicas Universitarias - Peru 2024"})}},3592:(a,e,i)=>{i.d(e,{A:()=>s});var n=i(5043),o=i(6213),r=(i(2845),i(579));const s=function(){const[a,e]=(0,n.useState)(0),[i,s]=(0,n.useState)(0),[l,c]=(0,n.useState)(0),[t,d]=(0,n.useState)(!0),[u,m]=(0,n.useState)(null);return(0,n.useEffect)((()=>{(async()=>{d(!0);try{const[a,i,n]=await Promise.all([o.A.get("https://buscadorempleos.onrender.com/contarObservacionesDiaAnterior"),o.A.get("https://buscadorempleos.onrender.com/contarObservacionesSemana"),o.A.get("https://buscadorempleos.onrender.com/contarObservacionesTotal")]);e(a.data.count||0),s(i.data.count||0),c(n.data.count||0)}catch(a){console.error("Error al obtener los conteos:",a),m("Error al obtener los conteos. Intenta de nuevo m\xe1s tarde.")}finally{d(!1)}})()}),[]),t?(0,r.jsx)("div",{className:"loading",style:{margin:"50px"},children:(0,r.jsx)("div",{className:"spinner"})}):u?(0,r.jsx)("p",{children:u}):(0,r.jsx)("div",{className:"total_observaciones",children:(0,r.jsxs)("div",{className:"inserciones",children:[(0,r.jsxs)("div",{className:"dia",children:[(0,r.jsx)("p",{children:a.toLocaleString("es-PE")}),(0,r.jsx)("h5",{children:"Ofertas laborales hoy"})]}),(0,r.jsxs)("div",{className:"semana",children:[(0,r.jsx)("p",{children:i.toLocaleString("es-PE")}),(0,r.jsx)("h5",{children:"Ofertas laborales \xfaltimos 7 d\xedas"})]}),(0,r.jsxs)("div",{className:"total",children:[(0,r.jsx)("p",{children:l.toLocaleString("es-PE")}),(0,r.jsx)("h5",{children:"Total ofertas menores a 20 d\xedas"})]})]})})}},1757:(a,e,i)=>{i.r(e),i.d(e,{default:()=>r});var n=i(5043),o=(i(2845),i(579));const r=function(a){let{paginaActual:e,totalPaginas:i,onCambiarPagina:r}=a;const[s,l]=(0,n.useState)(5);return(0,n.useEffect)((()=>{const a=()=>{window.innerWidth<=768?l(3):l(9)};return a(),window.addEventListener("resize",a),()=>{window.removeEventListener("resize",a)}}),[]),(0,o.jsxs)("div",{className:"paginacion",children:[(0,o.jsx)("button",{onClick:()=>r(e-1),disabled:1===e,children:"Anterior"}),(0,o.jsx)("div",{className:"numero-pagina",children:(()=>{let a=[];const n=Math.max(1,e-Math.floor(s/2)),o=Math.min(n+s-1,i);for(let e=n;e<=o;e++)a.push(e);return a})().map(((a,i)=>"..."===a?(0,o.jsx)("span",{className:"puntos-suspensivos",children:"..."},i):(0,o.jsx)("button",{className:a===e?"active":"",onClick:()=>r(a),children:a},i)))}),(0,o.jsx)("button",{onClick:()=>r(e+1),disabled:e===i,children:"Siguiente"})]})}},6439:(a,e,i)=>{i.d(e,{A:()=>r});i(5043);var n=i(7065),o=(i(2845),i(579));const r=function(a){let{onSelectLugar:e,onSelectEmpresa:i,empresas:r,lugar:s,empresa:l,departamentos:c}=a;const t={value:"",label:"Seleccionar Departamento"},d={value:"",label:"Seleccionar Empresas"},u=[t,...c.map((a=>({value:a,label:a})))],m=[d,...r.filter((a=>a&&""!==a.trim())).map((a=>({value:a,label:a})))],g={control:(a,e)=>({...a,borderColor:e.isFocused?"#47b72f":"#d0d0d0",boxShadow:e.isFocused?"0 0 0 1px #47b72f":null,"&:hover":{borderColor:"#47b72f"}}),menu:a=>({...a,zIndex:9999}),option:(a,e)=>({...a,backgroundColor:e.isSelected?"#47b72f":e.isFocused?"#e0f7e9":a.backgroundColor,color:e.isSelected?"white":a.color,"&:hover":{backgroundColor:"#e0f7e9"}})};return(0,o.jsxs)("div",{className:"selectores",children:[(0,o.jsx)(n.Ay,{id:"select-lugar",className:"select-lugar",styles:g,options:u,value:u.find((a=>a.value===s))||t,onChange:a=>e(a.value),placeholder:"Selecciona un lugar","aria-label":"Selecciona un lugar"}),(0,o.jsx)(n.Ay,{id:"select-empresa",className:"select-lugar",styles:g,options:m,value:m.find((a=>a.value===l))||d,onChange:a=>i(a.value),placeholder:"Selecciona una empresa","aria-label":"Selecciona una empresa"})]})}},9429:(a,e,i)=>{i.r(e),i.d(e,{default:()=>b});var n=i(5043),o=i(6213),r=i(7065),s=(i(2845),i(6149)),l=i(975),c=i(1669),t=i(1757),d=i(3592),u=i(6439),m=i(7357),g=i(579);const b=function(){const[a,e]=(0,n.useState)([]),[i,b]=(0,n.useState)([]),[p,v]=(0,n.useState)(!1),[f,h]=(0,n.useState)(null),[x,j]=(0,n.useState)(1),[_,C]=(0,n.useState)(0),[I,S]=(0,n.useState)(14),[A,E]=(0,n.useState)({palabraClave:"",lugar:"",empresa:"",carrera:""}),y=(0,n.useMemo)((()=>["Arequipa","Lima","Cusco","Puno","Apurimac","Amazonas","Ancash","Ayacucho","Cajamarca","Callao","Huancavelica","Huanuco","Ica","Junin","La Libertad","Lambayeque","Loreto","Madre de Dios","Moquegua","Pasco","Piura","San Martin","Tacna","Tumbes","Ucayali","Peru"]),[]),N=[{value:"",label:"Seleccionar Carrera"},{value:"Administraci\xf3n",label:"Administraci\xf3n"},{value:"Arquitectura",label:"Arquitectura"},{value:"Biolog\xeda",label:"Biolog\xeda"},{value:"Ciencia_de_la_Computaci\xf3n",label:"Ciencia de la Computaci\xf3n"},{value:"Ciencia_Pol\xedtica",label:"Ciencia Pol\xedtica"},{value:"Ciencias_de_la_Comunicaci\xf3n",label:"Ciencias de la Comunicaci\xf3n"},{value:"Contabilidad",label:"Contabilidad"},{value:"Derecho",label:"Derecho"},{value:"Dise\xf1ador_Grafico",label:"Dise\xf1o Gr\xe1fico"},{value:"Econom\xeda",label:"Econom\xeda"},{value:"Educaci\xf3n",label:"Educaci\xf3n"},{value:"Enfermer\xeda",label:"Enfermer\xeda"},{value:"Estad\xedstica",label:"Estad\xedstica"},{value:"Farmacia_y_Bioqu\xedmica",label:"Farmacia y Bioqu\xedmica"},{value:"Gastronom\xeda",label:"Gastronom\xeda"},{value:"Historia",label:"Historia"},{value:"Hoteler\xeda_y_Turismo",label:"Hoteler\xeda y Turismo"},{value:"Ingenier\xeda_Agr\xedcola",label:"Ingenier\xeda Agron\xf3mica y Agr\xedcola"},{value:"Ingenier\xeda_Ambiental",label:"Ingenier\xeda Ambiental"},{value:"Ingenier\xeda_Civil",label:"Ingenier\xeda Civil"},{value:"Ingenier\xeda_de_Industrias_alimentarias",label:"Ingenier\xeda de Industria Alimentaria"},{value:"Ingenier\xeda_de_Minas",label:"Ingenier\xeda de Minas"},{value:"Ingenier\xeda_de_Sistemas",label:"Ingenier\xeda de Sistemas"},{value:"Ingenier\xeda_El\xe9ctrica",label:"Ingenier\xeda El\xe9ctrica"},{value:"Ingenier\xeda_Industrial",label:"Ingenier\xeda Industrial"},{value:"Ingenier\xeda_Mec\xe1nica",label:"Ingenier\xeda Mec\xe1nica"},{value:"Ingenier\xeda_Mecatr\xf3nica",label:"Ingenier\xeda Mecatr\xf3nica"},{value:"Ingenier\xeda_Qu\xedmica",label:"Ingenier\xeda Qu\xedmica"},{value:"Marketing",label:"Marketing"},{value:"Medicina",label:"Medicina"},{value:"Medicina_Veterinaria",label:"Medicina Veterinaria"},{value:"Negocios_Internacionales",label:"Negocios Internacionales"},{value:"Nutrici\xf3n",label:"Nutrici\xf3n"},{value:"Odontolog\xeda",label:"Odontolog\xeda"},{value:"Psicolog\xeda",label:"Psicolog\xeda"},{value:"Publicidad_y_multimedia",label:"Publicidad y Multimedia"},{value:"Recursos_Humanos",label:"Recursos Humanos"},{value:"Ventas",label:"Ventas"},{value:"Almac\xe9n",label:"Almac\xe9n"}],w=(0,n.useMemo)((()=>[...new Set(i.map((a=>y.find((e=>a.lugar.includes(e))))))].filter(Boolean).sort(((a,e)=>a.localeCompare(e)))),[i,y]);(0,n.useEffect)((()=>{const a=()=>{S(window.innerWidth<=768?10:20)};return a(),window.addEventListener("resize",a),()=>window.removeEventListener("resize",a)}),[]),(0,n.useEffect)((()=>{(async()=>{v(!0);try{const a=await o.A.get("https://buscadorempleos.onrender.com/Ofertas-Laborales-hoy");e(a.data),b(a.data),C(a.data.length),j(1)}catch(f){console.error("Error fetching data:",f),h(f)}finally{v(!1)}})()}),[]);const M=(0,n.useMemo)((()=>[...new Set(i.map((a=>a.nom_empresa)))]),[i]);(0,n.useEffect)((()=>{(()=>{const{palabraClave:e,lugar:i,empresa:n,carrera:o}=A;let r=a;e&&(r=r.filter((a=>a.nom_oferta.toLowerCase().includes(e.toLowerCase())))),i&&(r=r.filter((a=>a.lugar.toLowerCase().includes(i.toLowerCase())))),n&&(r=r.filter((a=>a.nom_empresa.toLowerCase().includes(n.toLowerCase()))));const s={"Administraci\xf3n":["administracion","Administrador","logistica","nominas","creditos y cobranzas","comercial","costos","planeamiento","trade"],Arquitectura:["Arquitectura"],"Biolog\xeda":["Biologia","Microbiologia"],"Ciencia_de_la_Computaci\xf3n":["Ciencia de la Computacion","programacion","base de datos","Ciberseguridad","cloud","programador","estructuras de datos"],"Ciencia_Pol\xedtica":["Politica"],"Ciencias_de_la_Comunicaci\xf3n":["comunicacion","Periodismo","Audiovisuales","relaciones publicas","comunicador social","redes sociales","comunicador","periodista"],Contabilidad:["Contabilidad","impuestos","contable","costos","creditos y cobranzas"],Derecho:["Derecho","abogado","litigio","legal","abogada"],"Econom\xeda":["Economia","finanzas","mercado","inversion","nominas","creditos y cobranzas","comercial"],"Educaci\xf3n":["Educacion","docente","profesor","profesora"],"Enfermer\xeda":["Enfermeria","enfermera"],"Estad\xedstica":["Estadistica"],"Farmacia_y_Bioqu\xedmica":["farmacia","bioquimica","laboratorio"],"Gastronom\xeda":["Gastronomia","gastronomica","gastronomico","cocinero","cocinera","cocina"],"Hoteler\xeda_y_Turismo":["Hoteleria","turismo","turistico"],"Ingenier\xeda_Agr\xedcola":["Ingenieria Agricola","Ingeniero Agronomo","agronomia","agronomo","agronomia","agroindustrial","Ingenieria Agronoma"],"Ingenier\xeda_Ambiental":["Ingenieria Ambiental","ambiental","SHEQ"],"Ingenier\xeda_de_Industrias_alimentarias":["alimentaria"],"Ingenier\xeda_Civil":["Ingenieria Civil","civil","urbano","urbana"],"Ingenier\xeda_de_Minas":["Ingenier\xeda de Minas","mina","mineria","minero","SHEQ"],"Ingenier\xeda_de_Sistemas":["Ingenier\xeda de Sistemas","Ingeniero de sistemas","Ing Sistemas","Ing. sistemas","react","programaci\xf3n","angular","sql","data","devops"," ti ","php","soporte tecnico","Seguridad de la Informacion","Analisis De Datos","cloud","Data Analytics","Mysql"],"Ingenier\xeda_El\xe9ctrica":["electrica","electricista","Transformadores","electronica","electronico","ING. ELECTRICA"],"Ingenier\xeda_Industrial":["Ingenieria Industrial","Industrial","Ing industrial","Ing. Industrial","logistica","nominas","creditos y cobranzas","comercial","costos","planeamiento","trade"],"Ingenier\xeda_Mec\xe1nica":["mecanica","mecanico"],"Ingenier\xeda_Mecatr\xf3nica":["mecatronica","mecatronica"],"Ingenier\xeda_Qu\xedmica":["quimica","quimico"],Marketing:["Marketing","Publicidad"," marca ","Branding","trade"],Medicina:["Medicina"],Medicina_Veterinaria:["Veterinaria","veterinario","zootecnia"],Negocios_Internacionales:["Negocios Internacionales","comercio","exportacion","comercial","aduanas","logistica"],"Nutrici\xf3n":["Nutricion"],"Odontolog\xeda":["Odontologia","dental"],"Psicolog\xeda":["Psicologia","psicologo","psicologa","seleccion"],Publicidad_y_multimedia:["publicidad","multimedia"],Recursos_Humanos:["Recursos humanos","seleccion"],Ventas:["Ventas"],"Almac\xe9n":["almacen","inventarios","carga"],"Dise\xf1ador_Grafico":["dise\xf1ador grafico","grafico","dise\xf1o gr\xe1fico"]};o&&(r=r.filter((a=>{var e;return null===(e=s[o])||void 0===e?void 0:e.some((e=>a.nom_oferta.toLowerCase().includes(e.toLowerCase())))}))),b(r),C(r.length),j(1)})()}),[a,A]);const L=(0,n.useCallback)((a=>j(a)),[]),k=(0,n.useCallback)((a=>console.log("Link seleccionado:",a)),[]),P=(0,n.useCallback)(((a,e)=>{E((i=>({...i,[a]:e})))}),[]),q=(0,n.useMemo)((()=>Math.ceil(_/I)),[_,I]),z=x*I,B=z-I,D=(0,n.useMemo)((()=>i.slice(B,z)),[i,B,z]);return(0,g.jsxs)("div",{className:"pagina-inicio",children:[(0,g.jsxs)("div",{className:"portada",children:[(0,g.jsx)("img",{src:s,alt:"Portada",loading:"lazy"}),(0,g.jsxs)("div",{className:"contentform",children:[(0,g.jsxs)("h1",{children:["Oportunidades ",(0,g.jsx)("span",{style:{color:"white"},children:"Laborales"})," "]}),(0,g.jsxs)("h3",{children:["Descubre oportunidades laborales para estudiantes y reci\xe9n egresados",(0,g.jsx)("br",{})," en diversas carreras t\xe9cnicas y profesionales."]})]})]}),(0,g.jsx)(d.A,{}),(0,g.jsx)(c.A,{onBuscar:a=>P("palabraClave",a)}),(0,g.jsx)("div",{className:"selectores",children:(0,g.jsx)(r.Ay,{className:"select-lugar",styles:{control:(a,e)=>({...a,borderColor:e.isFocused?"#47b72f":"#d0d0d0",boxShadow:e.isFocused?"0 0 0 1px #47b72f":null,"&:hover":{borderColor:"#47b72f"}}),menu:a=>({...a,zIndex:9999}),option:(a,e)=>({...a,backgroundColor:e.isSelected?"#47b72f":e.isFocused?"#e0f7e9":a.backgroundColor,color:e.isSelected?"white":a.color,"&:hover":{backgroundColor:"#e0f7e9"}})},options:N,onChange:a=>P("carrera",a.value),value:N.find((a=>a.value===A.carrera)),placeholder:"Selecciona una carrera","aria-label":"Selecciona una carrera"})}),(0,g.jsx)(u.A,{onSelectLugar:a=>P("lugar",a),onSelectEmpresa:a=>P("empresa",a),empresas:M,lugar:A.lugar,empresa:A.empresa,departamentos:w}),(0,g.jsxs)("div",{className:"totalofertas",children:[_.toLocaleString("es-PE")," Empleos Hoy"]}),(0,g.jsx)("div",{className:"contenidoprincipal",children:(0,g.jsx)("div",{className:"contenedordecajas",children:D.length>0?D.map(((a,e)=>(0,g.jsx)(l.default,{oferta_laboral:a,navigateToLink:k},e))):(0,g.jsxs)("div",{children:[p&&(0,g.jsx)("div",{className:"loading",children:(0,g.jsx)("div",{className:"spinner"})}),f&&(0,g.jsxs)("div",{children:["Error: ",f.message]})]})})}),(0,g.jsx)(t.default,{paginaActual:x,totalPaginas:q,onCambiarPagina:L}),(0,g.jsx)(m.default,{})]})}},6149:(a,e,i)=>{a.exports=i.p+"static/media/portada.9fd919ebc37718e4bde4.avif"}}]);
//# sourceMappingURL=280.56ec0ddd.chunk.js.map