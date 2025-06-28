const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const asignaturas = reactive(JSON.parse(localStorage.getItem('asignaturas') || '[]'));

        const AsignaturaAEditar = reactive({
            id: null,
            nombre: '',
            sede: '',
        });

        function cargarAsignaturaParaEdicion(indiceAsignatura) {
            const index = parseInt(indiceAsignatura);
            if (!isNaN(index) && index >= 0 && index < asignaturas.length) {
                const asignaturaEncontrado = asignaturas[index];
                Object.assign(AsignaturaAEditar, {
                    id: index,
                    nombre: asignaturaEncontrado.nombre,
                    sede: asignaturaEncontrado.sede,
                });
            } else {
                alert("La asignatura que intentas editar no existe o el ID es inválido.");
                volverALista();
            }
        }

        function guardarEdicionAsignatura() {
            if (AsignaturaAEditar.nombre && AsignaturaAEditar.sede) {

                const index = AsignaturaAEditar.id;

                if (index !== null && index >= 0 && index < asignaturas.length) {
                    asignaturas[index] = {
                        nombre: AsignaturaAEditar.nombre,
                        sede: AsignaturaAEditar.sede,
                    };
                    localStorage.setItem('asignaturas', JSON.stringify(asignaturas));
                    alert("Asignatura actualizada con éxito!");
                    volverALista();
                } else {
                    alert("Hubo un error al intentar guardar la Asignatura.");
                }
            } else {
                alert("Por favor, complete todos los campos.");
            }
        }

        function volverALista() {
            window.location.href = '/views/asignaturas.html';
        }


        onMounted(() => {

            const urlParams = new URLSearchParams(window.location.search);
            const asignaturaId = urlParams.get('id');

            if (asignaturaId !== null) {
                cargarAsignaturaParaEdicion(asignaturaId);
            } else {
                alert("No se especificó qué asignatura editar. Volviendo a la lista.");
                volverALista();
            }
        });

        return {
            AsignaturaAEditar,
            guardarEdicionAsignatura,
            asignaturas,
            volverALista
        };
    }
}).mount('#app');