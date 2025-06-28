const { createApp, reactive, ref, onMounted } = Vue;

createApp({
    setup() {
        const nuevoAlumno = reactive({ rut: '', nombre: '', edad: '', correo: '', asignatura: '', profesor: '' });
        const alumnos = reactive(JSON.parse(localStorage.getItem('alumnos') || '[]'));
        const errors = reactive({});
        function guardarAlumnos() {
            localStorage.setItem('alumnos', JSON.stringify(alumnos));
        }

        function agregarAlumno() {

            let rutValue = nuevoAlumno.rut;
            let rut = rutValue.split("-")

            if (rut.length != 2) {
                errors.rut = 'El RUT es obligatorio y debe tener un formato válido (123456789-0).';
            }

            if (isNaN(rut[0])) {
                errors.rut = 'El RUT debe tener un formato válido (123456789-0).';
            }

            if (rut.length == 2 && !["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "k", "K"].includes(rut[1])) {
                errors.rut = 'El RUT debe tener un formato válido (123456789-0).';
            }

            if (nuevoAlumno.nombre === '' && nuevoAlumno.nombre.length == 0) {
                errors.nombre = 'El nombre es obligatorio.';
            }

            if (!/^[a-zA-Z\s]+$/.test(nuevoAlumno.nombre)) {
                errors.nombre = 'El nombre solo debe contener letras.';
            }

            if (nuevoAlumno.edad === '' || isNaN(nuevoAlumno.edad) || nuevoAlumno.edad < 0) {
                errors.edad = 'La edad es obligatoria y debe ser un número positivo.';
            }

            if (nuevoAlumno.correo === '' || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(nuevoAlumno.correo)) {
                errors.correo = 'El correo es obligatorio y debe tener un formato válido.';
            }

            if (nuevoAlumno.asignatura === '') {
                errors.asignatura = 'La asignatura es obligatoria.';
            }

            if (nuevoAlumno.profesor === '') {
                errors.profesor = 'El profesor es obligatorio.';
            }



            if (Object.keys(errors).length > 0) {
                // alert(`Errores:\n${Object.values(errors).join('\n')}`);
                return;
            }

            alumnos.push({
                rut: nuevoAlumno.rut, nombre: nuevoAlumno.nombre, edad: nuevoAlumno.edad, correo: nuevoAlumno.correo, asignatura: nuevoAlumno.asignatura, profesor: nuevoAlumno.profesor,
            });
            nuevoAlumno.nombre = '';
            nuevoAlumno.rut = '';
            nuevoAlumno.edad = '';
            nuevoAlumno.correo = '';
            nuevoAlumno.asignatura = '';
            nuevoAlumno.profesor = '';
            guardarAlumnos();
        }


        function eliminarAlumno(indice) {
            alumnos.splice(indice, 1);
            guardarAlumnos();
        }


        const asignaturas = ref([]);
        const profesores = ref([]);

        onMounted(() => {
            asignaturas.value = JSON.parse(localStorage.getItem('asignaturas') || '[]');
            profesores.value = JSON.parse(localStorage.getItem('profesores') || '[]');
        });

        return {
            nuevoAlumno,
            alumnos,
            asignaturas,
            profesores,
            errors,
            agregarAlumno,
            eliminarAlumno
        };

    }
}).mount('#app');
