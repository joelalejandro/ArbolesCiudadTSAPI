/**
Cliente TypeScript para API de ArbolesCiudad.com.ar
Versión 0.1
Por Joel A. Villarreal Bertoldi
<hola@joelalejandro.com>

www.ArbolesCiudad.com.ar es un sitio realizado por Manuchis,
en colaboración con Ludmila Medina.
**/

module ArbolesCiudad {

    export class CategoriaArbol {
        public id: string;
        public nombre: string;
        public color: string;
        public icono: string;
        public otro: string;
    }

    export class Ciudad {
        public id: string;
        public idPais: string;
        public latitud: string;
        public longitud: string;
    }

    export class Reporte {
        public id: string;
        public arbol: Arbol;
        public categoriaReporte: string;

        constructor() {
            this.arbol = new Arbol();
        }
    }

    export class Ubicacion {
        public latitud: string;
        public longitud: string;
        public distancia: string;
        public calle: string;
        public altura: string;
        public comuna: string;
    }

    export class Arbol {
        public id: string;
        public categoria: CategoriaArbol;
        public ubicacion: Ubicacion;
        public publicadoPor: string;
        public imagen: string;
        public estado: string;
        public comentario: string;

        constructor() {
            this.categoria = new CategoriaArbol();
            this.ubicacion = new Ubicacion();
        }
    }

    export class API {

        private apiKey: string;
        private baseUrl: string;

        constructor(apiKey?: string) {
            this.apiKey = apiKey;
            this.baseUrl = "http://arbolesciudad.com.ar/API/";
        }

        getArboles(): JQueryPromise {
            return $.ajax({
                url: this.baseUrl + "arboles",
                dataType: "json",
                dataFilter: function (data, type) {
                    var arboles = [];
                    for (var x = 0; x < data.length; x++) {
                        var arbol = new Arbol();
                        arbol.id = data[x].id;
                        arbol.categoria.id = data[x].catid;
                        arbol.categoria.nombre = data[x].catname;
                        arbol.categoria.color = data[x].catcolor;
                        arbol.categoria.icono = data[x].caticon;
                        arbol.publicadoPor = data[x].name;
                        arbol.ubicacion.calle = data[x].address;
                        arbol.ubicacion.altura = data[x].number;
                        arbol.ubicacion.comuna = data[x].borough;
                        arbol.comentario = data[x].comment;
                        arbol.categoria.otro = data[x].cat_ext;
                        arbol.imagen = data[x].image;
                        arbol.ubicacion.latitud = data[x].lat;
                        arbol.ubicacion.longitud = data[x].lng;
                        arbol.estado = data[x].state;
                        arboles.push(arbol);
                    };
                    return arboles;
                }
            });
        }
        
    }

}
