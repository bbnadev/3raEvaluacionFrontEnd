const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const profesores = reactive(JSON.parse(localStorage.getItem('profesores') || '[]'));

        const ProfesorAEditar = reactive({
            id: null,
            nombre: '',
            correo: '',
        });

        function cargarProfesorParaEdicion(indiceProfesor) {
            const index = parseInt(indiceProfesor);
            if (!isNaN(index) && index >= 0 && index < profesores.length) {
                const profesorEncontrado = profesores[index];
                Object.assign(ProfesorAEditar, {
                    id: index,
                    nombre: profesorEncontrado.nombre,
                    correo: profesorEncontrado.correo,
                });
            } else {
                alert("El profesor que intentas editar no existe o el ID es inválido.");
                volverALista();
            }
        }

        function guardarEdicionProfesor() {
            if (ProfesorAEditar.nombre && ProfesorAEditar.correo) {

                const index = ProfesorAEditar.id;

                if (index !== null && index >= 0 && index < profesores.length) {
                    profesores[index] = {
                        nombre: ProfesorAEditar.nombre,
                        correo: ProfesorAEditar.correo,
                    };
                    localStorage.setItem('profesores', JSON.stringify(profesores));
                    alert("Profesor actualizada con éxito!");
                    volverALista();
                } else {
                    alert("Hubo un error al intentar guardar el Profesor.");
                }
            } else {
                alert("Por favor, complete todos los campos.");
            }
        }

        function volverALista() {
            window.location.href = '/views/profesores.html';
        }


        onMounted(() => {

            const urlParams = new URLSearchParams(window.location.search);
            const profesorId = urlParams.get('id');

            if (profesorId !== null) {
                cargarProfesorParaEdicion(profesorId);
            } else {
                alert("No se especificó qué profesor editar. Volviendo a la lista.");
                volverALista();
            }
        });

        return {
            ProfesorAEditar,
            guardarEdicionProfesor,
            profesores,
            volverALista
        };
    }
}).mount('#app');