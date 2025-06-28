const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const alumnos = reactive(JSON.parse(localStorage.getItem('alumnos') || '[]'));

        const AlumnoAEditar = reactive({
            id: null,
            rut: '',
            nombre: '',
            edad: '',
            correo: '',
            asignatura: '',
            profesor: '',
        });

        function cargarAlumnoParaEdicion(indiceAlumno) {
            const index = parseInt(indiceAlumno);
            if (!isNaN(index) && index >= 0 && index < alumnos.length) {
                const alumnoEncontrado = alumnos[index];
                Object.assign(AlumnoAEditar, {
                    id: index,
                    rut: alumnoEncontrado.rut,
                    nombre: alumnoEncontrado.nombre,
                    edad: parseInt(alumnoEncontrado.edad),
                    correo: alumnoEncontrado.correo,
                    asignatura: alumnoEncontrado.asignatura,
                    profesor: alumnoEncontrado.profesor,
                });
            } else {
                alert("El alumno que intentas editar no existe o el ID es inválido.");
                volverALista();
            }
        }

        function guardarEdicionAlumno() {
            if (AlumnoAEditar.rut && AlumnoAEditar.nombre && AlumnoAEditar.edad && AlumnoAEditar.correo &&
                AlumnoAEditar.asignatura && AlumnoAEditar.profesor) {

                const index = AlumnoAEditar.id;

                if (index !== null && index >= 0 && index < alumnos.length) {
                    alumnos[index] = {
                        rut: AlumnoAEditar.rut,
                        nombre: AlumnoAEditar.nombre,
                        edad: parseInt(AlumnoAEditar.edad),
                        correo: AlumnoAEditar.correo,
                        asignatura: AlumnoAEditar.asignatura,
                        profesor: AlumnoAEditar.profesor,
                    };
                    localStorage.setItem('alumnos', JSON.stringify(alumnos));
                    alert("Alumno actualizado con éxito!");
                    volverALista();
                } else {
                    alert("Hubo un error al intentar guardar el Alumno.");
                }
            } else {
                alert("Por favor, complete todos los campos y asegúrese que la edad sea válida.");
            }
        }

        function volverALista() {
            window.location.href = '/views/alumnos.html';
        }

        const asignaturas = ref([]);
        const profesores = ref([]);

        onMounted(() => {
            asignaturas.value = JSON.parse(localStorage.getItem('asignaturas') || '[]');
            profesores.value = JSON.parse(localStorage.getItem('profesores') || '[]');

            const urlParams = new URLSearchParams(window.location.search);
            const alumnoId = urlParams.get('id');

            if (alumnoId !== null) {
                cargarAlumnoParaEdicion(alumnoId);
            } else {
                alert("No se especificó qué libro editar. Volviendo a la lista.");
                volverALista();
            }
        });

        return {
            AlumnoAEditar,
            guardarEdicionAlumno,
            alumnos,
            asignaturas,
            profesores,
            volverALista
        };
    }
}).mount('#app');